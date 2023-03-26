import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateJWTToken } from "../services/token.js";

const router = Router();

router.get("/register", (req, res) => {
  if (req.cookies.token) {
    return res.redirect('/')
  }
  res.render("register", {
    title: "Register",
    isRegister: true,
    registerError: req.flash("registerError"),
    userError: req.flash("userError"),
  });
});

router.get("/login", (req, res) => {
  
  if (req.cookies.token) {
    return res.redirect('/')
  }
  res.render("login", {
    title: "Login",
    isLogin: true,
    loginError: req.flash("loginError"),
  });
});

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    req.flash("registerError", "All fields are required!");
    return res.redirect("/register");
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    req.flash("registerError", "User already exists!");
    return res.redirect("/register");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userDate = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
  };

  const user = await User.create(userDate);

  const token = generateJWTToken(user._id);
  res.cookie("token", token, { httpOnly: true, secure: true });

  res.redirect("/login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    req.flash("loginError", "All fields are required!");
    return res.redirect("/login");
  }

  const existUser = await User.findOne({ email });
  if (!existUser) {
    req.flash("loginError", "User not found!");
    return res.redirect("/login");
  }

  const checkPassword = await bcrypt.compare(password, existUser.password);
  if (!checkPassword) {
    req.flash("loginError", "Wrong Password!");
    return res.redirect("/login");
  }

  const token = generateJWTToken(existUser._id);
  res.cookie("token", token, {httpOnly: true, secure: true});

  res.redirect("/");
});

router.get("/logout", async (req, res) => {
  res.clearCookie('token')
  return res.redirect('/')
})

export default router;
