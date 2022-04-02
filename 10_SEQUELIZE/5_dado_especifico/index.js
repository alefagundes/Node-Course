const express = require('express')
const exphbs = require('express-handlebars')

const conn = require('./db/conn')

const User = require('./models/User')
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

 app.get('/', async(req, res) => {
    const users = await User.findAll({raw:true})
    console.log(users)
    
     res.render('home', { users: users })
 })

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

 conn.sync().then(() => {
    app.listen(3000, () => {
        console.log('App rodando!')
    })
    
 }).catch((err) => {
     console.log(err)
 })
 

