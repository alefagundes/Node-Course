const fs = require('fs')

fs.rename('arquivo.txt', 'alessandro.txt', function(err){
    if(err){
        console.log(err)
        return
    }else{
        console.log('Arquivo renomeado')
    }
})