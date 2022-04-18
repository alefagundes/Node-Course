const router = require('express').Router()
const PertController = require('../controllers/PertController')

//middlewares 
const veryfyToken = require('../helpers/verify-token')
const {imageUpload} = require('../helpers/image-upload')


//routes
router.post('/create', veryfyToken, imageUpload.array('images'), PertController.create)


module.exports = router