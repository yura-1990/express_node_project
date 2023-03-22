import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  /* res.sendFile(path.join(__dirname, 'views', 'index.html'))  -- this is a rendering method to render the html*/
  res.render("index", {
    title: 'Home',
    isHome: true
  });
});

router.get("/add", (req, res) => {
  /* res.sendFile(path.join(__dirname, 'views', 'about.html')) */
  res.render("add", {
    title: 'Add',
    isAdd: true
  });
});

router.get("/products", (req, res) => {
  res.render("product", {
    title: 'Product',
    isProduct: true
  });
});

export default router