let joi = require('joi');
const VALIDATON_LOGIN = {
    options: {allowUnknownBody: false},
    body:{
        username:joi.string().required(),
        password:joi.string().required()
    }
}
module.exports = {
    VALIDATON_LOGIN
}