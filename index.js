import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { engine, create } from 'express-handlebars';
import authRouter from './routers/auth.js'
import productRouter from './routers/product.js'
import admin from './routers/admin.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const hbs = create({defaultLayout: 'main', extname: 'hbs' })

app.engine('hbs', hbs.engine); /* Configure the handlebars into hbs */
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.urlencoded({extended:true}))
app.use(express.static('assets')) 

app.use(authRouter)
app.use(productRouter)
app.use(admin)





const PORT = process.env.PORT || 4100
app.listen(PORT, ()=>console.log(`Server is working on port ${PORT}`))