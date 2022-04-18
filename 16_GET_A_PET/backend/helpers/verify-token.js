const jwt = require('jsonwebtoken')
const getToken = require('./get-token')

//middleware to validate token
const checkToken = (req, res, next) => {
    console.log(req.headers)
    if(!req.headers.authorization){
        res.status(401).json({message: 'Acesso negado!'})
        return
    }
    const token = getToken(req)

    if(!token){
        res.status(401).json({message: 'Acesso negado!'})
    }
    try{
        const verified = jwt.verify(token, 'nossosecret')
        req.user = verified
        next()

    }catch(err){
        res.status(401).json({message: 'Token Invalido!'})
    }

}
module.exports = checkToken