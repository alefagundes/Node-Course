const express = require('express')
const exphbs = require('express-handlebars')

const conn = require('./db/conn')

const User = require('./models/User')
const Adress = require('./models/Adress')
 const app = express()

 app.engine('handlebars', exphbs.engine())

 app.set('view engine', 'handlebars')

 app.use(express.static('public'))

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

app.get('/users/create', (req, res) => {
    res.render('adduser')
})

app.post('/users/create', async(req, res) => {
    const name = req.body.name
    const ocuppation = req.body.ocuppation
    let newsletter = req.body.newsletter
    
    if(newsletter === 'on'){
        newsletter = true
    }else{
        newsletter = false
    }
    await User.create({name, ocuppation, newsletter})

    res.redirect('/')
})

app.get('/users/:id', async(req, res) => {
   const id = req.params.id
   const user = await User.findOne({raw: true, where: { id: id}})
   console.log(user)

   res.render('userview', {user})

})

app.post('/users/delete/:id', async(req, res) => {
    const id = req.params.id
    await User.destroy({where: {id: id}})

    res.redirect('/')
})

app.get('/users/edit/:id', async(req, res) => {
    const id = req.params.id
    const user = await User.findOne({raw: true, where: {id: id}})
    res.render('useredit', {user})
})

app.post('/users/edit/:id', async(req, res) => {
    const {id, name, ocuppation} = req.body
    let newsletter = req.body.newsletter
    if(newsletter === 'on'){
        newsletter = true
    }else{
        newsletter = false
    }
    const userData = {
        id,
        name,
        ocuppation,
        newsletter
    }
    await User.update(userData, {where: {id: id}})
    res.redirect('/')
})

app.post('/address/create', async(req, res) => {
   const UserId = req.body.UserId
   const street = req.body.street
   const city = req.body.city
   const number = req.body.number

   const adress = {
       UserId,
       street,
       number,
       city
   }
   await Adress.create(adress)
   res.redirect(`/users/edit/${UserId}`)
})

 app.get('/', async(req, res) => {
    const users = await User.findAll({raw:true})
    console.log(users)
    
     res.render('home', { users: users })
 })

 conn
 .sync()
 //.sync({force: true})
 .then(() => {
    app.listen(3000, () => {
        console.log('App rodando!')
    })
    
 }).catch((err) => {
     console.log(err)
 })
 

 