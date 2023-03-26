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
  if (req.cookies.token) {
    res.render("add", {
      title: 'Add',
      isAdd: true
    });
  } else {
    res.redirect('/login')
  }
});

router.get("/products", (req, res) => {
  if (req.cookies.token) {
    res.render("product", {
      title: 'Product',
      isProduct: true
    });
  }else{
    res.redirect('/login')
  }
 
});


export default router