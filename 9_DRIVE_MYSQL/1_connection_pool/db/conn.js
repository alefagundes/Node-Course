const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 15,
    host: 'localhost',
    user: 'root',
    password: 'Quarterback33',
    database: 'nodemysql'
})

module.exports = pool