const express = require('express')
const router = require('express').Router()
const ToughtController = require('../controllers/ToughtController')

router.get('/', ToughtController.showToughts)

module.exports = router