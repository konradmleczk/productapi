import express = require('express')
const {CORRECT_MESSAGE} = require("../data/text.constant")
const {Validator} = require("../utils/Validator")
const {v4: uuid} = require("uuid")
const {pool} = require('../utils/db')


exports.getAll = async function (req: express.Request, res: express.Response) {
    const [products] = await pool.execute("SELECT * FROM `product`")
    const validator = new Validator(true, CORRECT_MESSAGE.findMany, 200)
    validator.checkFind(products)
    res.status(validator.code).json({
        isSuccess: validator.isSuccess,
        message: validator.message,
        product: products
    })
};

exports.getOne = async function (req: express.Request, res: express.Response) {
    const [product] = await pool.execute("SELECT * FROM `product` WHERE `id`=:id", {
        id: req.params.id
    })
    const validator = new Validator(true, CORRECT_MESSAGE.findOne, 200)
    validator.checkFind(product)
    res.status(validator.code).json({
        isSuccess: validator.isSuccess,
        message: validator.message,
        product: product
    })
};


exports.createOne = async function (req: express.Request, res: express.Response) {
    const name = req.body.name
    const price = Number(req.body.price)
    const validator = new Validator(true, CORRECT_MESSAGE.create, 200)
    validator.checkData({name, price})
    const id = uuid()
    if (validator.isSuccess) {
        const [products] = await pool.execute("INSERT INTO `product` (`id`, `name`,`price`) VALUES(:id,:name,:price)", {
            id,
            name,
            price,
        })
        validator.checkSave(products.affectedRows)
    }
    res.status(validator.code).json({
        isSuccess: validator.isSuccess,
        message: validator.message,
        id: validator.isSuccess ? id : null
    })
};


exports.updateOne = async function (req: express.Request, res: express.Response) {
    const id = req.params.id
    const name = req.body.name
    const price = Number(req.body.price)
    const validator = new Validator(true, CORRECT_MESSAGE.update, 200)
    validator.checkData({name, price})
    if (validator.isSuccess) {
        const [products] = await pool.execute("UPDATE `product` SET `name`=:name,`price`=:price WHERE `id`=:id", {
            id,
            name,
            price,
        })
        validator.checkSave(products.affectedRows)
    }
    res.status(validator.code).json({
        isSuccess: validator.isSuccess,
        message: validator.message,
    })
};


exports.deleteOne = async function (req: express.Request, res: express.Response) {
    const validator = new Validator(true, CORRECT_MESSAGE.delete, 200)
    const [products] = await pool.execute("DELETE FROM `product` WHERE `id`=:id", {
        id: req.params.id
    })
    validator.checkSave(products.affectedRows)
    res.status(validator.code).json({
        isSuccess: validator.isSuccess,
        message: validator.message,
    })
};