const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserController {

    static async register(req, res){
        const {name, phone, email, password, confirmPassword} = req.body

        //validation
        if(!name){
            res.status(422).json({message: 'O nome é obrigatorio'})
            return
        }else if(!phone){
            res.status(422).json({message: 'O phone é obrigatório'})
            return
        
        }else if(!email){
            res.status(422).json({message: 'o email é obrigatorio'})
        
        }else if(!password){
            res.status(422).json({message: 'A senha é obrigatorio'})
            return

        }else if(!confirmPassword){
            res.status(422).json({message: 'A confirmação de senha é obrigatoria'})
            return

        }else if(confirmPassword!==password){
            res.status(422).json({message: 'A senhas e a confirmação de senha precisam ser iguais'})
            return

        }
        //check user exists
        const userExists = await User.findOne({email: email})

        if(userExists){
            res.status(422).json({message: 'Por gentileza, utilize outro e-mail!'})
        }


        //create a password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //create User
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash
        })
        console.log(user)

        try{
            const newUser = await user.save()
            await createUserToken(newUser, req, res)

        }catch(err){
            res.status(500).json({message: err})
            return
        }
        
    }

    static async login(req, res){
        const {email, password} = req.body

        if(!email){
        res.status(422).json({message: 'o email é obrigatorio'})
            
        }else if(!password){
            res.status(422).json({message: 'A senha é obrigatoria'})
        }
        //check user exists
        const user = await User.findOne({email: email})

        if(!user){
            res.status(422).json({message: 'Não eh usuário cadastrado com este e-mail!'})
            return
        }
        //check if password match with db password
        const chechPassword = await bcrypt.compare(password, user.password)

        if(!chechPassword){
            res.status(422).json({message: 'E-mail ou senha incorretos!'})
            return
        }
        await createUserToken(user, req, res)
    }

    static async checkUser(req, res){
        let currentUser
        console.log(req.headers.authorization)
        
        if(req.headers.authorization){
            const token = getToken(req)

            const decoded = jwt.verify(token, 'nossosecret')
            currentUser = await User.findById(decoded.id)

            currentUser.password = undefined

        }else{
            currentUser = null
        }
        res.status(200).send(currentUser)
    }

    static async getUserById(req, res){
        const id = req.params.id

        const user = await User.findById(id).select('-password')
        if(!user){
            res.status(422).json({message: 'Usuário não encontrado!'})
            return
        }
        res.status(200).json({user})
    }

    static async editUser(req, res){
     
     //check if user exists
     const token = getToken(req)
     const user = await getUserByToken(token)

     const {name, email, phone, password, confirmPassword} = req.body

     let image = ''

    if (req.file) {
      user.image = req.file.filename
    }

    // validations
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório!' })
      return
    }

    user.name = name

    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório!' })
      return
    }

    // check if user exists
    const userExists = await User.findOne({ email: email })

    if (user.email !== email && userExists) {
      res.status(422).json({ message: 'Por favor, utilize outro e-mail!' })
      return
    }

    user.email = email

    if (image) {
      const imageName = req.file.filename
      user.image = imageName
    }

    if (!phone) {
      res.status(422).json({ message: 'O telefone é obrigatório!' })
      return
    }

    user.phone = phone

    // check if password match
    if (password != confirmPassword) {
      res.status(422).json({ error: 'As senhas não conferem.' })

      // change password
    } else if (password == confirmPassword && password != null) {
      // creating password
      const salt = await bcrypt.genSalt(12)
      const reqPassword = req.body.password

      const passwordHash = await bcrypt.hash(reqPassword, salt)

      user.password = passwordHash
    }

    try {
      // returns updated data
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true },
      )
      res.json({
        message: 'Usuário atualizado com sucesso!',
        data: updatedUser,
      })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
}