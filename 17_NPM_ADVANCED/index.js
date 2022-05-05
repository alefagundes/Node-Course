const request = require('request')

request('https://www.google.com', function (error, response, body) {
    console.log('error: ', error)
    console.log('response: ', response)
    console.log('body: ', body)
})

//npm link request
//npm install request -g

//npm remove request -g
//npm remove link request
