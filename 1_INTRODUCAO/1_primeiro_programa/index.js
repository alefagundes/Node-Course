const fs = require('fs');
//read file with node.js (module File System)
fs.readFile('arquivo.txt', 'utf-8', (err, data) => {

    if(err){
        console.log(err);
    }
    console.log(data);

});