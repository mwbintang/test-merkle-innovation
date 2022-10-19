const { verifyJWT } = require('../helpers/jwt')
const {admin} = require('../models')

const isAuth = async (req, res, next)=>{
    try {
        const {access_token} = req.headers
        if(!access_token) {
            throw ({name:'Not login'})
        }
        const jwtVerified = verifyJWT(access_token)
        if(!jwtVerified){
            throw ({name:'User Not Found'})
        }
        const adminLogin = await admin.findByPk(jwtVerified.id)
        if(!adminLogin){
            throw ({name:'User Not Found'})
        }

        req.adminFind = {
            id:adminLogin.id
        }
        next()

    } catch (error) {
        next(error)
    }
}

module.exports = isAuth