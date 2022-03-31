const express = require('express')
const exphbs = require('express-handlebars')

const mysql = require('mysql')

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
    conn.query(sql, function(err){
        if(err){
            console.log(err)
        }else{
            res.redirect('/')
        }
    })
 })

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Quarterback33',
    database: 'nodemysql'
})

conn.connect(function (err){
    if(err){
        console.log(err)
    }else{
        console.log('Conectado Mysql')
        app.listen(3000)
    }
})