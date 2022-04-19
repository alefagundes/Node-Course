const router = require('express').Router()
const PertController = require('../controllers/PertController')

//middlewares 
const veryfyToken = require('../helpers/verify-token')
const {imageUpload} = require('../helpers/image-upload')


//routes
router.post('/create', veryfyToken, imageUpload.array('images'), PertController.create)
router.get('/', PertController.getAll)
router.get('/mypets', veryfyToken, PertController.getAllUserPets)
router.get('/myadoptions', veryfyToken, PertController.getAllUserAdoptions)


module.exports = router