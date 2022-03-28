const express = require('express')
const router = express.Router()

const path = require('path')

const basePath = path.join(__dirname, '../templates')

router.get('/add', (req, res) => {
    res.sendFile(`${basePath}/usersForm.html`)
})

router.post('/save', (req, res) => {
   console.log(req.body)

   const name = req.body.name
   const age = req.body.age
   console.log(`O usuario ${name} tem ${age}`)

   res.sendFile(`${basePath}/usersForm.html`)
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    //leitura da tabela users

    console.log(`Estamos buscando o usuario ${id}`)
    res.sendFile(`${basePath}/users.html`)
 })

 module.exports = router