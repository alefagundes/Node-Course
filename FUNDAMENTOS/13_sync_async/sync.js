const fs = require('fs')
let alessandro = "Vamos nessa deus!"

console.log('inicio')

fs.writeFileSync("arquivo.txt", alessandro)

console.log('fim')