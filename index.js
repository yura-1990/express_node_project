import express from "express";
import flash from "connect-flash";
import session from "express-session"
import cookieParser from 'cookie-parser'
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helHbs from './utils/index.js'

import { fileURLToPath } from "url";
import { engine, create } from "express-handlebars";

import authRouter from "./routers/auth.js";
import productRouter from "./routers/product.js";
import globalVar from "./middleware/globalVar.js";
import admin from "./routers/admin.js";
import userTokenMiddleware from './middleware/token.js'


dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const hbs = create({ defaultLayout: "main", extname: "hbs", helpers:helHbs});


app.engine("hbs", hbs.engine); /* Configure the handlebars into hbs */
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("assets"));
app.use(express.json());
app.use(cookieParser())
app.use(userTokenMiddleware);
app.use(globalVar);
app.use(session({secret: 'murod', resave: false, saveUninitialized: false}))
app.use(flash());

app.use(authRouter);
app.use(productRouter);
app.use(admin);


mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then((res) => console.log("mongoDb connected"));

const PORT = process.env.PORT || 4100;
app.listen(PORT, () => console.log(`Server is working on port ${PORT}`));
