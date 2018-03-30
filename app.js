const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    flash = require('connect-flash'),
    expressValidator = require('express-validator'),
    passport = require('passport'),
    path = require('path'),
    mongooseStore = require('./config/connection').mongoose,
    //routes = require('./config/routes'),
    policies = require('./config/policies'),
    ejsLocals = require('ejs-locals');
//мидллвэры для шаблонов
app.engine('ejs', ejsLocals);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//парсим тело запроса
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies
app.use(cookieParser());
//устанавливаем сессии и настраиваем хранилище
app.use(session({
    secret:'secret',
    saveUninitialized:true,
    resave: true,
    store: new MongoStore({mongooseConnection:mongooseStore.connection})
}));
/*Инициализация паспорта*/
app.use(passport.initialize());
app.use(passport.session());
/*Подключаем модуль валидации*/
app.use(expressValidator({
    errorFormatter:function(param, msg, value){
        "use strict";
        let namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;
        while(namespace.length){
            formParam += '[' + namespace.shift() +']';
        }
        return{
            param:formParam,
            msg:msg,
            value:value
        }
    }
}));
//настраиваем флэш сообщения
app.use(flash());
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    res.locals.originalUrl = req.originalUrl;
    next();

});
//статика
app.use('/assets', express.static(__dirname + '/assets'));
//все остальное на роуты
app.use('/', policies/*routes*/);
app.listen(9000, function () {
    console.log('Listening on port 3000!');
});