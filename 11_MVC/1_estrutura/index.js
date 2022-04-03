const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const app = express()

app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs.engine())

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json)
app.use(express.static('public'))

conn.sync()
.then(() => {
    app.listen(3000, () => {
        console.log('App rodando')
    })
}).catch((err) => {
    console.log(err)
})