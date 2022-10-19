const bcrypt = require("bcrypt");

function hashPass(pass) {
    return bcrypt.hashSync(pass, 10)
}

function compare(pass, userPass) {
    return bcrypt.compareSync(pass, userPass)
}
module.exports = {
    hashPass,
    compare
}