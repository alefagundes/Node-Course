const express = require('express')
const app = express()

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

//routes or endpoints
app.post('/createproduct', (req, res) => {
    const name = req.body.name
    const price = req.body.price

    console.log(name)
    console.log(price)
    res.json({message: `o dev ${name} foi criado com sucesso!`})

})

app.get('/', (req, res) => {
    res.json({message: 'oi primeira rota criada com sucesso'})
})



app.listen(3000)