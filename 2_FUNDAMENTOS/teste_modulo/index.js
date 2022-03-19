const inquirer = require('inquirer')
const chalk = require('chalk')

inquirer.prompt([
    {
        name: "nome",
        message: "Qual o seu nome?"
    },
    {
        name: "idade",
        message: "Qual a sua idade?"
    }
]).then((answars) => {
    if(!answars.nome || answars.idade){
        throw new Error(chalk.bgRed.white("O nome e a idade sao obrigatorios"));
    }
   const response = `o nome do usuario eh: ${answars.nome} e ele tem ${answars.idade}`
   console.log(chalk.bgYellow.black(response))
})
.catch((err) => console.log(err))