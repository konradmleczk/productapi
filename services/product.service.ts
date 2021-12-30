import express = require('express')
import {CORRECT_MESSAGE} from "../data/text.constant";

const {pool} = require('../utils/db')
const {ValidationEngine} = require('../utils/ValidationEngine')
const {v4: uuid} = require("uuid")

exports.getAll = async function (req: express.Request, res: express.Response) {
    const [products] = await pool.execute("SELECT * FROM `product`")
    res.json({
        message: CORRECT_MESSAGE.findMany,
        product: products
    })
};

exports.getOne = async function (req: express.Request, res: express.Response) {
    const [product] = await pool.execute("SELECT * FROM `product` WHERE `id`=:id", {
        id: req.params.id
    })
    ValidationEngine.checkFind(product)
    res.json({
        message: CORRECT_MESSAGE.findOne,
        product,
    })
};


exports.createOne = async function (req: express.Request, res: express.Response) {
    const name = req.body.name
    const price = Number(req.body.price)
    ValidationEngine.checkData({name, price})
    const id = uuid()
    const [products] = await pool.execute("INSERT INTO `product` (`id`, `name`,`price`) VALUES(:id,:name,:price)", {
        id,
        name,
        price,
    })
    ValidationEngine.checkSave(products.affectedRows)
    res.status(201)
    res.json({
        message: CORRECT_MESSAGE.create,
        id,
    })
};


exports.updateOne = async function (req: express.Request, res: express.Response) {
    const id = req.params.id
    const name = req.body.name
    const price = Number(req.body.price)
    ValidationEngine.checkData({name, price})
    const [products] = await pool.execute("UPDATE `product` SET `name`=:name,`price`=:price WHERE `id`=:id", {
        id,
        name,
        price,
    })
    ValidationEngine.checkSave(products.affectedRows)
    res.json({
        message: CORRECT_MESSAGE.update,
    })
};


exports.deleteOne = async function (req: express.Request, res: express.Response) {
    const [products] = await pool.execute("DELETE FROM `product` WHERE `id`=:id", {
        id: req.params.id
    })
    ValidationEngine.checkSave(products.affectedRows)
    res.json({
        message: CORRECT_MESSAGE.delete,
    })
};