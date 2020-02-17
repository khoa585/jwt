let { getToken, decode } = require('./../commons/JWThelpers');
let ResponsiveHelper = require('./../commons/ResponsiveHelper');
let ERROR = require('./../constants/error');
let { UsersDB, UsersField } = require('./../databases/users');
const URLNOTREQUIREAUTHEN = [
    '/users/login',
    '/users/me',
    '/users/changePassword'
]
let JWTauthen = async (req, res, next) => {
    let jwt = req.headers['Authorization'] || req.headers['authorization'];
    if (!jwt) return next();
    let payload = decode(jwt);
    let resultUser = await UsersDB.findOne({
        where: {
            [UsersField.Id]: payload.data
        },
        attributes: { exclude: [UsersField.Password, UsersField.NotesAdmin] }
    })
    if (resultUser && payload) {
        req.user = resultUser;
    }
    next();
}
let isNotRequiredAuthen = (url) => {
    if (URLNOTREQUIREAUTHEN.includes(url))
        return true;
    return false;
}
let requireAuthen = (req, res, next) => {
    if (isNotRequiredAuthen(req.url)) return next();
    if (!req.user) {
        return ResponsiveHelper.json(req, res, ERROR.NOT_AUTHEN);
    }
}
module.exports = {
    JWTauthen,
    requireAuthen
};