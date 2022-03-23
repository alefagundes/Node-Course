//External Modules
const inquirer = require('inquirer')
const chalk = require('chalk')

//Internal Modules
const fs = require('fs')

operation()

function operation(){
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message:'O que voce deseja fazer?',
        choices: ['Criar conta','Consultar Saldo','Depositar','Sacar','Sair'],
    },
]).then((answer) => {
   const action = answer['action']
   if(action === 'Criar conta'){
       createAccount()
   
    }else if(action === 'Consultar Saldo'){
     getAccountBalance()
   
    }else if(action === 'Depositar'){
       deposit()
   
    }else if(action === 'Sacar'){
      widthdraw()
   
    }else if(action === 'Sair'){
        console.log(chalk.bgBlue.white('Obrigado por usar o Accounts!'))
        process.exit()
   }
   
}).catch((err) => {
    console.log(err)
})
}

//create an account
function createAccount(){
    console.log(chalk.bgGreen.black('Parabens por escolher o nosso Banco!'))
    console.log(chalk.green('Defina as opcoes da sua conta a seguir:'))
    buildAccount()
}

function buildAccount(){
    inquirer.prompt([{
        name:'accountName',
        message:'Digite um nome para sua conta:'
   
    }]).then(answer => {
        const accountName = answer['accountName']
        console.info(accountName)

        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        
        }else if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black('Essa conta ja existe, escolha outro nome.'))
            buildAccount()
            return
        }else {
        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', function(err) {
            console.log(err)
        },
        )
        }

        console.log(chalk.bgGreen.white('Parabens, a sua conta foi criada!'))
        operation()

    }).catch((err) => {
        console.log(err)
    })
}

//add an amount to user account

function deposit(){
    inquirer.prompt([
    {
        name: 'accountName',
        message: 'Informe a conta para realizar o deposito:'
    }
]).then(answer => {
    const accountName = answer['accountName']
    //verify if account exists
       if(!checkAccount(accountName)){
           return deposit()
       }
       inquirer.prompt([
           {
               name: 'amount',
               message: 'Informe o valor a ser depositado:'
           }
       ]).then((answer) => {
           const amount = answer['amount']
           //add amount
           addAmount(accountName, amount)
           operation()
       })
       
       .catch((err) => console.log(err))
    
    }).catch((err) => {
        console.log(err)
    })
}

function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black('Esta conta nao existe, escolha outro nome!'))
        return false
    }else {
        return true
    }
}

function addAmount(accountName, amount){
    const accountData = getAccount(accountName)
    if(!amount){
        console.log(chalk.bgRed.white('Ocorreu um erro, tente novamente mais tarde!'))
        return deposit()
    }
    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), 
    function(err){
        console.log(err)
    })
    console.log(chalk.bgGreen.white(`Foi depositado o valor de R$${amount} na sua conta!`))
}

function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding:'utf-8',
        flag: 'r'
    })
    return JSON.parse(accountJSON)
}

function getAccountBalance(){
    inquirer.prompt([{
        name: 'accountName',
        message: 'Informe a conta a ser consultado o saldo:'
    
    }]).then(answer => {
       const accountName = answer['accountName']

       //verify if account exists
       if(!checkAccount(accountName)){
        return getAccountBalance()
       }
       const accountData = getAccount(accountName)
       console.log(chalk.bgBlue.white(`Saldo da sua conta eh R$${accountData.balance}`))
       operation()
    
    }).catch((err) => console.log(err))
}

function widthdraw(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Informe o nome da conta a ser sacado o valor?'
        }
    ]).then(answer => {
        const accountName = answer['accountName']

        //verify if account exists
        if(!checkAccount(accountName)){
            return widthdraw()
        }else {
            inquirer.prompt([
                {
                    name: 'value',
                    message: 'Informe o valor a ser sacado:'
                }
            ]).then(answer => {

            const accountData = getAccount(accountName)
            accountData.balance -= answer['value']
            fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), function(err){
                console.log(err)
            })
            console.log(chalk.bgBlue.white(`O valor de R$${answer['value']} foi subtraido da conta.`))
            operation()

            }).catch((err) => console.log(err))
        }
    })
    .catch((err) => console.log(err))
}