const Pet = require('../models/Pet')

//helper
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class PetController{

    //create a pet
    static async create(req, res){
      const {name, age, weight, color} = req.body
      const images = req.files

      const available = true

      //images upload

      //validations
        if(!name){
            res.status(422).json({message: 'O nome é obrigatório!'})
            return
        }
        if(!age){
            res.status(422).json({message: 'O idade é obrigatório!'})
            return
        }
        if(!weight){
            res.status(422).json({message: 'O peso é obrigatório!'})
            return
        }
        if(!color){
            res.status(422).json({message: 'O cor é obrigatório!'})
            return
        }

        if(images.length === 0){
            res.status(422).json({message: 'A imagem é obrigatório!'})
            return
        }
        //get pet owner
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            image: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone,
            }
        })
        images.map((images) =>{
          pet.images.push(images.filename)  
        })

        try{
            const newPet = await pet.save()
            res.status(201).json({message: 'Pet cadastrado com sucesso!', newPet})

        }catch(err){
            res.status(500).json({message: `Erro interno: ${err}`})
        }
    }

    static async getAll(req, res){
        const pets = await Pet.find().sort('-createdAt')
        res.status(200).json({pets: pets})
    }

    static async getAllUserPets(req, res){
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({'user._id': user._id}).sort('-createdAt')
        
        res.status(200).json({pets})
    }

    static async getAllUserAdoptions(req, res) {
        // get user
        const token = getToken(req)
        const user = await getUserByToken(token)
    
        const pets = await Pet.find({ 'adopter._id': user._id })
    
        res.status(200).json({
          pets,
        })
      }

      static async getPetById(req, res){
          const id = req.params.id

          if(!ObjectId.isValid(id)){
             res.status(422).json({message: 'ID invalido!'})
             return
          }
          //get pet
          const pet = await Pet.findOne({_id: id})

          if(!pet){
              res.status(404).json({message: 'Pet nao encontrado!'})
          }
          res.status(200).json({pet: pet})
      }

      static async removePetById(req, res){
          const id = req.params.id

          //check if id is valid
          if(!ObjectId.isValid(id)){
              res.status(422).json({message: 'ID invalid!'})
              return
          }
          //get a pet
          const pet = await Pet.findOne({_id: id})

          if(!pet){
            res.status(404).json({message: 'Pet nao encontrado!'})
        }
          //check if logged in user registered the pet
          const token = getToken(req)
          const user = await getUserByToken(token)
          
          if(pet.user._id.toString() !== user._id.toString()){
              res.status(422).json({message: 'Hove um problema em processar sua solicitação, tente novamente mais tarde!'})
          }
          await Pet.findByIdAndRemove(id)
          
          res.status(200).json({message: 'Pet removido com sucesso!'})
      }
}