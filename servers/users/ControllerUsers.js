let express = require('express');
let router = express.Router();
let { VALIDATON_LOGIN } = require('./ValidateController');
let ErrorEC = require('./../../constants/error');
let { getToken } = require('./../../commons/JWThelpers');
let ResponsiveHelper = require('./../../commons/ResponsiveHelper');
let validate = require('express-validation');
let UserModels = require('./ModelUser');
let { UsersDB, UsersField } = require('./../../databases/users');
router.post('/login', validate(VALIDATON_LOGIN), async (req, res) => {
    console.log(req.body);
    let result = await UserModels.login(req.body);
    console.log('------------'+result);
    if (!result) {
        return ResponsiveHelper.json(req, res, ErrorEC.LOGIN_FAIL, null);
    }
    else {
        result.JWT = getToken(result.Id);
        return ResponsiveHelper.json(req, res, null, result);
    }
})

router.get('/me', async (req, res) => {
    // console.log(req.headers['authorization']);
    let result = req.user;
    return ResponsiveHelper.json(req, res, null, result);
})
router.post('/changePassword', async (req, res) => {
    let result = req.user;
    const returnUser = await UsersDB.findOne({
        where: {
            [UsersField.UserName]: result.dataValues.UserName,
            [UsersField.Password]: req.body.curentpassword
        }
    })
    if (returnUser) {
        const returnUpdate = await UsersDB.update(
            {
                [UsersField.Password]: req.body.newpassword
            },
            {
                where: {
                    [UsersField.UserName]: result.dataValues.UserName,
                    [UsersField.Password]: req.body.curentpassword
                }
            }
        )
        if (!returnUpdate) {
            return ResponsiveHelper.json(req, res, ErrorEC.UPDATE_FAIL, null);
        } else {
            return ResponsiveHelper.json(req, res, null, result);
        }
    } else {
        return ResponsiveHelper.json(req, res, ErrorEC.ERROR_PASSWORD, null);
    }
})
module.exports = router;