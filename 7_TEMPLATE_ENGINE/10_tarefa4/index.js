const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())

app.set('view engine', 'handlebars')


app.use(express.static('public'))

const products = [
    {
        id: 1,
        name: 'TV',
        category: 'Eletronics', 
        price: 400.00 
    },
    {
        id: 2,
        name: 'smartphone',
        category: 'Eletronics',
        price: 1000.00
    }
]

app.get('/', (req, res) => {
    res.render('home', {products})
})

app.get('/product/:id', (req, res) => {
    const product = products[parseInt(req.params.id)-1]
    res.render('product', {product})
})


app.listen(3000, () => {
    console.log("App esta rodando!")
})