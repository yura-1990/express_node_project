import { Router } from "express";
import Products from "../models/Product.js";
import auth from "../middleware/auth.js";
import token from "../middleware/token.js";
import moment from "moment/moment.js";
const router = Router();

router.get("/", async (req, res) => {
  const user = req.userId ? req.userId.toString() : null
  const userProducts = await Products.find({user}).populate('user').lean()
  const results = await userProducts.map((el) => ({
    _id: el._id,
    title: el.title,
    comment: el.comment,
    image: el.image,
    createdAt: moment(el.createdAt, "YYYYMMDD").fromNow(),
    user: el.user,
  }));
  
  console.log(results);
  
  res.render("index", {
    title: "Home",
    isHome: true,
    userProducts: results.reverse()
  });
});

router.get("/add", auth, (req, res) => {
  res.render("add", {
    title: "Add",
    isAdd: true,
    errorProduct: req.flash("errorProduct"),
  });
});

router.get("/products", auth, async (req, res) => {
  
  const products = await Products.find();
  const results = await products.map((el) => ({
    _id: el._id,
    title: el.title,
    comment: el.comment,
    image: el.image,
    createdAt: moment(el.createdAt, "YYYYMMDD").fromNow(),
    user: el.user.toString(),
  }));
  
  console.log(results);
  
  res.render("product", {
    title: "Product",
    isProduct: true,
    products: results.reverse(),
    userId: req.userId.toString(),
  });
});

router.post("/add-product", token, async (req, res) => {
  const { title, comment, image, price } = await req.body;

  if (!title || !comment || !image || !price) {
    req.flash("errorProduct", "All fields are required!");
    return res.redirect("/add");
  }

  const product = await Products.create({ ...req.body, user: req.userId });

  return res.redirect("/");
});

export default router;
