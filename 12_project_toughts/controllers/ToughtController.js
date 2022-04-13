const Tought = require('../models/Tought')
const User = require('../models/User')


module.exports = class TaughtsController {
    
    static async showToughts(req, res){
        res.render('toughts/home')
    }

    static async dashboard(req, res){
        res.render('toughts/dashboard')
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
        req.session.save()
        res.redirect('/toughts/dashboard')
        
        } catch(err){
            console.log('Aconteceu um erro: ' + err)
        }
    }
}