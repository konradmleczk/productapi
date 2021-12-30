const express = require("express");
const router = express.Router();
const product = require("../services/product.service")
router.get("/", product.getAll);
router.get("/:id", product.getOne);
router.post("/", product.createOne);
router.put("/:id", product.updateOne);
router.delete("/:id", product.deleteOne);
module.exports = router;