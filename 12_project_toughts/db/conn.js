const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('toughts', 'root', 'Quarterback33', {
    host: 'localhost',
    dialect: 'mysql'
})

try{
    sequelize.authenticate()
    console.log('Conectado ao banco Tought')

}catch(err){
    console.log(err)
}

module.exports = sequelize