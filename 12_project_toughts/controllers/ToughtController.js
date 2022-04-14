const Tought = require('../models/Tought')
const User = require('../models/User')


module.exports = class TaughtsController {
    
    static async showToughts(req, res){

        const toughtsData = await Tought.findAll({
            include: User,
        })

        const toughts = toughtsData.map((result) => result.get({plain:true}))

        res.render('toughts/home', {toughts})
    }

    static async dashboard(req, res){
        const userId = req.session.userid
        const user = await User.findOne({where: {id: userId}, include:Tought, plain:true})

        //check user exists
        if(!user){
            res.redirect('/login')
        }
        const toughts = user.Toughts.map((result) => result.dataValues)

        let emptyToughts = false
        
        if(toughts.length === 0){
            emptyToughts = true
        }
        console.log(toughts)
        res.render('toughts/dashboard', {toughts, emptyToughts})
    }

    static createToughts(req, res){
        res.render('toughts/create')
    }
    static async createToughtsSave(req, res){
        const tought = {
            title: req.body.title,
            UserId: req.session.userid
        }
        try{
        await Tought.create(tought)

            req.flash('message', 'Pensameto criado com suceesso!')
            req.session.save(() =>{
                res.redirect('/toughts/dashboard')
            })
        } catch(err){
            console.log('Aconteceu um erro: ' + err)
        }
    }

    static async removeTought(req, res){
        const id= req.body.id
        const UserId = req.session.userid
        try {
            await Tought.destroy({where: {id: id, UserId: UserId}})
            req.flash('message', 'Pensameto removido com suceesso!')
            req.session.save(() =>{
                res.redirect('/toughts/dashboard')
            })
        }catch(err){
            console.log(err)
        }
    }

    static async editTought(req, res){
        const id = req.params.id

        try{
            const tought = await Tought.findOne({where: {id: id}, raw: true})
            console.log(tought)
            res.render('toughts/edit', {tought})
        }catch(err){
            console.log(err)
        }
    }

    static async editToughtPost(req, res){
        const id = req.body.id
        const tought = {
            title: req.body.title
        }
        try{
            await Tought.update(tought, {where: {id: id}})
            req.flash('message', 'Pensameto atualizado com suceesso!')
            req.session.save(() =>{
                res.redirect('/toughts/dashboard')
            })
        }catch(err){
            console.log(err)
        }
    }
}