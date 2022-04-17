const express = require('express')
const cors = require('cors')
const app = express()


//config JSON response
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

//solve cors
app.use(cors({ credentials: true, origin: 'http://localhost:3000'}))

//public folder for images
app.use(express.static('public'))

//routes

app.listen(5000)