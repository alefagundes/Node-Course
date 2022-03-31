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

 app.get('/', (req, res) => {
     res.render('home')
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
     User.create({name, ocuppation, newsletter})
     
     console.log(req.body)

     await res.redirect('/')

 })

 conn.sync().then(() => {
    app.listen(3000, () => {
        console.log('App rodando!')
    })
    
 }).catch((err) => {
     console.log(err)
 })
 

