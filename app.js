require('dotenv').config();
let express = require('express');
let responsivetime = require('response-time');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let cors = require('cors');
let bodyParser = require('body-parser');
let {JWTauthen,requireAuthen} = require('./middlewares/JWTAuthen');
let ResponsiveHelper = require('./commons/ResponsiveHelper');
let ErrorHelper = require('./commons/ErrorHelper');
let ErrorEC = require('./constants/error');
let server = require('./servers');
let app = express();
app.use(cookieParser());
app.use(responsivetime());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use(JWTauthen);
app.use(requireAuthen);
app.use('/',server);
app.get('/',(req,res)=>{
    res.send('phong');
})
app.use(function(error,req,res,next){
    console.log(error);
    if(error.name='ValidationError'){
        ResponsiveHelper.json(req,res,ErrorHelper.error(ErrorEC.FAIL_VALIDATION,error,req),null);
        return 
    }
    res.status(error.status || 500);
    // res.render('error', {
    //     message: err.message,
    //     error: {}
    // });
    ResponseHelper.json(req, res, ErrorHelper.error(error.message, error, req), null);
    
})
app.listen(process.env.PORT,(error)=>{
    console.log('Server start successed with PORT ' + process.env.PORT);
})