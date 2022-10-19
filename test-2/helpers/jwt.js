const jwt = require('jsonwebtoken')
require('dotenv').config()

const key = process.env.SECRET
function signJWT(payload){
    return jwt.sign(payload, key)
}

function verifyJWT(token){
    return jwt.verify(token, key)
}

module.exports = {
    signJWT,
    verifyJWT
}