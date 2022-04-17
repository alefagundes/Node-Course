const User = require('../models/User')
const bcrypt = require('bcrypt')
const createUserToken = require('../helpers/create-user-token')

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
}