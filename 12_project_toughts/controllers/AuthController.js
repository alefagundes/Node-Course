const User = require('../models/User')
const bcrypt = require('bcryptjs')


module.exports = class AuthController {
    static login(req, res){
        res.render('auth/login')
    }
    static async loginPost(req, res){
        const {email, password} = req.body
            //check user exists
            const user = await User.findOne({where: {email: email}})
            if(!user){
                req.flash('message', 'Credenciais incorretas!')
                res.render('auth/login')
                return
            }
            //check password
            const passwordMatch = bcrypt.compareSync(password, user.password)
            if(!passwordMatch){
                req.flash('message', 'Credenciais incorretas!')
                res.render('auth/login')
                return
            }
            //initialize session
            req.session.userid = user.id

            req.flash('message', 'Autenticação realizada com sucesso!')
            req.session.save(() => {
                res.redirect('/')
            })
    }

    static register(req, res){
        res.render('auth/register')
    }

    static async registerPost(req, res){
        const {name, email, password, confirmpassword} = req.body
        //password match validation

        if(password!= confirmpassword){
            req.flash('message', 'As senhas não conferem, tente novamente!')
            res.render('auth/register')
            return
        }
        //check if user exists
        const checkIfUserExist = await User.findOne({where: {email: email}})
        if(checkIfUserExist){
            req.flash('message', 'O e-mail já está em uso!')
            res.render('auth/register')
            return
        }
        //create a password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword
        }
        try{
            const crateuser = await User.create(user)
            //initialize session
            req.session.userid = crateuser.id

            req.flash('message', 'Cadastro realizado com sucesso!')
            req.session.save(() => {
                res.redirect('/')
            })
        }catch(err){
            console.log(err)
        }
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }

    
}