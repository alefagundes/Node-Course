const {DataTypes} = require('sequelize')
const db = require('../db/conn')
const User = require('./User')

const Adress = db.define('Adress', {
    street: {
        type: DataTypes.STRING,
        require: true
    },
    number: {
        type: DataTypes.STRING,
        require: true
    },
    city: {
        type: DataTypes.STRING,
        require: true
    }
});

Adress.belongsTo(User)

module.exports = Adress