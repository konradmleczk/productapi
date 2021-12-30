import express = require('express')
require('express-async-errors');
require('dotenv').config()
const http = require("http");
const {handleErr} = require("./utils/errors");
const productRouter = require('./controlers/product.controler')
const app = express();

app.use(express.json())
app.use(express.urlencoded({
    extended: true,
}));
app.use('/product',productRouter)
app.use("/", (req: express.Request, res: express.Response) => {
    res.send("is running")
});

app.use(handleErr);

const port = process.env.PORT || 5000;
const server = http.createServer(
    app);
server.listen(port);
