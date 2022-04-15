//imports
const express= require('express')
const exphbs = require('express-handlebars')
const app = express()
const conn = require('./db/conn')

//routes
const productsRoutes = require('./routes/productsRoutes')

//engine
app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs.engine())

//styles public folder
app.use(express.static('public'))

//read body
app.use(express.urlencoded({
    extended: true
}))

app.use('/products', productsRoutes)


app.use(express.json())


app.listen(3000)
