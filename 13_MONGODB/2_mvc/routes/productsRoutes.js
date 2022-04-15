const express  = require('express')
const router = require('express').Router()
const ProductController = require('../controllers/ProductController')

router.get('/', ProductController.showProducts)

module.exports = router