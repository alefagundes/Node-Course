const express = require('express')
const authRoutes = require('../routes/authRoutes')
const router = require('express').Router()
const ToughtController = require('../controllers/ToughtController')

//helpers
const checkAuth = require('../helpers/auth').checkAuth

router.get('/add', checkAuth,  ToughtController.createToughts)
router.get('/dashboard', checkAuth,  ToughtController.dashboard)
router.get('/', ToughtController.showToughts)

module.exports = router