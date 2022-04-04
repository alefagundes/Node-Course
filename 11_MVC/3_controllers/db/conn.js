const {Sequelize, ConnectionAcquireTimeoutError} = require('sequelize')

const sequelize = new Sequelize('nodemvc', 'root', 'Quarterback33', {
    host: 'localhost',
    dialect: 'mysql'
})

try{
    sequelize.authenticate()
    console.log('Conectado ao banco nodemvc')

}catch(err){
    console.log(err)
}


module.exports = sequelize

