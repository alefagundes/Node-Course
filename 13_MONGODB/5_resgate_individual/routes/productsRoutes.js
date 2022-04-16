const express  = require('express')
const router = require('express').Router()
const ProductController = require('../controllers/ProductController')

router.get('/:id', ProductController.getProduct)
router.get('/', ProductController.showProducts)
router.get('/create', ProductController.createProduct)
router.post('/create', ProductController.createProductPost)


module.exports = router