const inquirer = require('inquirer')

inquirer.prompt([
    {
    name: 'p1',
    message: 'Qual a primeira nota?',
},
{
    name: 'p2',
    message: 'Qual a segunda nota?',
},
]).then((answars) => {
    console.log(answars)
    const media = (parseInt(answars.p1) + parseInt(answars.p2)) / 2
    console.log(`A media eh: ${media}`)
})
.catch(err => console.log(err))
