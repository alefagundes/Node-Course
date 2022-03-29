const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)

app.set('view engine', 'handlebars')

app.use(express.static('public'))

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

app.get('/blog', (req, res) => {
    const posts = [
    {
        title: 'Aprender node.js',
        category: 'JavaScript',
        body: 'teste',
        comments: 4
    },
    {
        title: 'Aprender PHP',
        category: 'php',
        body: 'teste',
        comments: 4
    },
    {
        title: 'Aprender Java',
        category: 'java',
        body: 'teste',
        comments: 4
    }
]
    res.render('blog', {posts})
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