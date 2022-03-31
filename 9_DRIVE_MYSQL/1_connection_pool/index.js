const express = require('express')
const exphbs = require('express-handlebars')

const pool = require('./db/conn')

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

 app.post('/books/insertbook', (req, res) => {
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}','${pageqty}')`
    pool.query(sql, function(err){
            if(err){
                console.log(err)
            }else{
                res.redirect('/books')
            }
        })
 })

app.get('/books/edit/:id', (req, res) =>{
    const id = req.params.id
    const sql = `SELECT * FROM books WHERE Id = ${id}`
    pool.query(sql, (err, data) =>{
            if(err){
                console.log(err)
                return
            }else{
                const book = data[0]
                res.render('editbooks', {book})
            }
        }) 
})

app.post('/books/updatebooks', (req, res) =>{
    const id = req.body.id
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `UPDATE books SET title = '${title}', pageqty = ${pageqty} WHERE id = ${id}`
    pool.query(sql, function(err) {
            if(err){
                console.log(err)
                return
            }
                res.redirect('/books')
        })
})


app.get('/books/:id', (req, res) =>{
    const id = req.params.id
    console.log(id)
    const sql = `SELECT * FROM books WHERE books.Id = ${id}`
    pool.query(sql, (err, data) =>{
            if(err){
                console.log(err)
                return
            }else{
                const book = data[0]
                console.log(book)
                res.render('book', {book})
            }
        })
})

app.post('/books/remove/:id', (req, res) =>{
    const id = req.params.id
    const sql = `DELETE FROM books WHERE Id = ${id}`
    pool.query(sql, (err) => {
            if(err){
                console.log(err)
            }
            res.redirect('/books')
    })
})

app.get('/books', (req, res) =>{
    const sql = 'SELECT * FROM books'
    pool.query(sql, (err, data) =>{
            if(err){
                console.log(err)
            }else{
                const books = data
                console.log(data)
                res.render('books', {books})
            }
        })
    console.log('Query executada!')
})

app.listen(3000, () => {
    console.log('App rodando!')
})