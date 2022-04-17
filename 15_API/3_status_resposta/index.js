const express = require('express')
const app = express()

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

//routes or endpoints
app.get('/', (req, res) => {
    res.status(200).json({message: 'primeira rota criada com sucesso'})
})

app.post('/createproduct', (req, res) => {
    const name = req.body.name
    const price = req.body.price
    if(!name){
        res.status(422).json({message: 'o campo name eh obrigatorio'})
        return
    }

    console.log(name)
    console.log(price)
    res.status(201).json({message: `o dev ${name} foi criado com sucesso!`})
})

app.listen(3000)