const mongoose = require('mongoose')

async function main(){

        mongoose.connect('mongodb://localhost:27017/testemongoose')
        console.log('Conectado ao database testemongoose')
    
}

main().catch((err) => console.log(err))

module.exports = mongoose