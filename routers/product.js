import { Router } from "express";
import Products from '../models/Product.js'
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", (req, res) => {
  /* res.sendFile(path.join(__dirname, 'views', 'index.html'))  -- this is a rendering method to render the html*/
  res.render("index", {
    title: 'Home',
    isHome: true
  });
});

router.get("/add", auth, (req, res) => {
  res.render("add", {
    title: 'Add',
    isAdd: true,
    errorProduct: req.flash("errorProduct") 
  });
});

router.get("/products", auth, (req, res) => {
  res.render("product", {
    title: 'Product',
    isProduct: true,
  });
});

router.post('/add-product', auth, async (req, res)=>{
  const { title, comment, image, price } = req.body;

  if (!title || !comment || !image || !price) {
    req.flash("errorProduct", "All fields are required!");
    return res.redirect("/add");
  }
  
  const products = await Products.create(req.body)
  return res.redirect('/')
})


export default router