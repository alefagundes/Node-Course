const express = require('express')
const app = express()
const port = 5000

const projectsRouter = require('./projects')

//arquivos staticos
app.use(express.static('public'))

app.use('/projects', projectsRouter)

app.listen(port, () => {
    console.log(`Executado na porta ${port}`)
})