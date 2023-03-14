import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { engine, create } from 'express-handlebars';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const hbs = create({defaultLayout: 'main', extname: 'hbs' })

app.engine('hbs', hbs.engine); /* Configure the handlebars into hbs */
app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/', (req, res)=>{
  /* res.sendFile(path.join(__dirname, 'views', 'index.html'))  -- this is a rendering method to render the html*/
  res.render('index');
})

app.get('/about', (req, res)=>{
  /* res.sendFile(path.join(__dirname, 'views', 'about.html')) */
  res.render('about')
})

const PORT = process.env.PORT || 4100
app.listen(PORT, ()=>console.log(`Server is working on port ${PORT}`))