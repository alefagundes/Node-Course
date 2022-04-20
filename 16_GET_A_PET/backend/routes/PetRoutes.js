const router = require('express').Router()
const PetController = require('../controllers/PetController')

//middlewares 
const veryfyToken = require('../helpers/verify-token')
const {imageUpload} = require('../helpers/image-upload')


//routes
router.post('/create', veryfyToken, imageUpload.array('images'), PetController.create)
router.get('/', PetController.getAll)
router.get('/mypets', veryfyToken, PetController.getAllUserPets)
router.get('/myadoptions', veryfyToken, PetController.getAllUserAdoptions)
router.get('/:id', PetController.getPetById)
router.delete('/:id', veryfyToken, PetController.removePetById)
router.patch('/:id', veryfyToken, imageUpload.array('images'), PetController.updatePet)
router.patch('/schedule/:id', veryfyToken, PetController.schedule)
router.patch('/conclude/:id', veryfyToken, PetController.concludeAdoption)


module.exports = router