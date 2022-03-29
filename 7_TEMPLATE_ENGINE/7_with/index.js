const express = require('express')
const exphbs = require('express-handlebars')

const app = express()


app.engine('handlebars', exphbs.engine())

app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res) => {

    const items = ["Item a", "Item b", "Item c", "Item d", "Item e"]

    res.render('dashboard', {items})
})

app.get('/post', (req, res) => {
    const post = {
        title: 'Aprender node.js',
        category: 'JavaScript',
        body: 'Este artigo te ajudara com node.js',
        comments: 180
    }
    res.render('blogpost', {post})
})

app.get('/', (req, res) => {
    const user ={
        name: "alessandro",
        surname: "Fagundes", 
        age: 30
    }

    const auth = false

    const approved = true

    const palavra = "teste"
    res.render('home', {user: user, palavra, auth, approved})
})

app.listen(3000, () => {
    console.log('app funcionando')

})