const jwt = require('jsonwebtoken')
const getToken = require('../helpers/get-token')

// middleware to validate token
const checkToken = (req, res, next) => {

    if(!req.headers.authorization) { // verificar se existe
        return res.status(401).json({message: 'Acesso negado'})
    }

    const token = getToken(req)

    if(!token){
        return res.status(401).json({message: 'Acesso negado'})
    }

    try {
        const verified = jwt.verify(token, 'secret')
        req.user = verified
        next()
    } catch (err) {
        return res.status(401).json({message: 'Token negado'})

    }

}

module.exports = checkToken