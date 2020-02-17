let express = require('express');
let router = express.Router();
let users = require('./users/ControllerUsers');
router.use('/users',users);
module.exports = router ;