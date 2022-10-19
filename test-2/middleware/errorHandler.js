const errorHandler = function (err, req, res, next) {
    let code = 500
    let msg = 'Internal Server Error'
    if (err.name == 'Not login') {
        code = 401
        msg = 'Please login first'
    } else if (err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeValidationError') {
        code = 400
        msg = err.errors.map(el=>el.message)
    } else if (err.name == 'wrong email/password' || err.name == `email/password not valid`) {
        code = 401
        msg = err.name
    } else if (err.name == 'User Not Found') {
        code = 401
        msg = 'User Not Found'
    } else if (err.name == 'Data Not Found') {
        code = 404
        msg = 'Data Not Found'
    }
    res.status(code).json({ msg })
}

module.exports = errorHandler;