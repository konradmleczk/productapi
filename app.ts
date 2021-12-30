import express = require('express')
require('express-async-errors');
require('dotenv').config()
const http = require("http");

const productRouter = require('./controlers/product.controler')
const app = express();

app.use(express.json())
app.use(express.urlencoded({
    extended: true,
}));
app.use('/product',productRouter)
app.use('/',(req,res)=>{
    res.send("Please check route:'/product'")
})

const port = 3000;
const server = http.createServer(
    app);
server.listen(port);
