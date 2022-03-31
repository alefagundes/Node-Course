const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodesequelize', 'root', 'Quarterback33', {
    host: 'localhost',
    dialect: 'mysql'
})

try{
    sequelize.authenticate()
    console.log('conectamos com sucesso com Sequelize.')

}catch(err){
    console.log('Nao foi possivel conectar: ', err)
}

module.exports = sequelize