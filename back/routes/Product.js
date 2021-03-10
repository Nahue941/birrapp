const express = require("express");
const router = express.Router();
const db = require("../db")
const { Product } = require("../models")

router.get('/', (req, res) => {
	Product.findAll()
	.then(product => res.send(product));
});

router.get('/:id', (req, res, next) => {
	Product.findByPk(req.params.id)
	.then(product => res.send(product));
});

router.put('/:id', (req, res) => {
	Product.update(req.body, {where: {id: req.params.id}})
	.then(product => res.status(201).send(product));
})

router.post('/:id', (req, res, next) => {
	Product.create(req.body)
	.then(product => res.status(201).send(product));
})

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    Product.destroy(req.body, {where: id})
          .then(() => res.sendStatus(204))
          .catch(err => res.status(500).send(err));
})

module.exports = router;