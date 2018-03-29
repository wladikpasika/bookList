const userModel = require('../models/User').user,
    createUser = require('../models/User').createUser,
    bcrypt = require('bcrypt'),
    comparePassword = require('./helpers/loginCheck'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

//вынес, все что можно вынести с обхъекта
passport.serializeUser((user, done)=>{done(null, user.id)});
passport.deserializeUser((id, done)=>{
    userModel.findOne({id:id}).then((resolve)=>{done(null, resolve)},(reject)=>{done(reject)});
});

module.exports = {
    registration(req,res,next){
        let email = req.body.email,
            login = req.body.login,
            password = req.body.password,
            rePassword = req.body.rePassword;
        //Валидация наших данных c тела запроса
        req.checkBody('login', 'Пустое поле логин').notEmpty();
        req.checkBody('email', 'Пустое поле email').notEmpty();
        req.checkBody('password', 'Пустое поле пароль').notEmpty();
        req.checkBody('rePassword', 'Пароли не совпадают').equals(req.body.password);
        let errors = req.validationErrors();
        if (errors) {
            req.flash('error', errors);
            return res.redirect('/registration');
        }
        let newUser = new userModel({
            'login': login,
            'email': email,
            'password': password
        });
        createUser(newUser).then(()=>{
            req.flash('success_msg', 'Вы зарегистрированы');
            return res.redirect('/');
        }).catch(err => {
            console.log(err);
            req.flash('error', [{msg:JSON.stringify(err)}]);
            return res.redirect('/registration');
        });
    },
    login(req, res, next){
        req.checkBody('email', 'Пустое поле email').notEmpty();
        req.checkBody('password', 'Пустое поле пароль').notEmpty();
        let errors = req.validationErrors();
        if (errors) {
            req.flash('error', errors);
            return res.redirect('/');
        }
        ///настройка паспорта
        passport.use(new LocalStrategy({usernameField:'email', passwordField: 'password'},
            function(username, password, done){
                comparePassword(username, password).then(result => {
                    return done(null, result)}).catch((err)=>{req.flash('error', [{msg:err}]); return done(null,false)})
            }
        ));

        function autotentification (req, res, next) {
            passport.authenticate('local', function(err, user, info) {
                if (err) { return next(err)}
                req.logIn(user, function(err) {
                    if (err) { return next(err)}
                    else{res.redirect(`/user/${user.id}`)
                    }
                });
            })(req, res, next);
        };
        return autotentification(req, res, next);
    },
    logout(req, res, next){
        req.logout(req.user);
        if(!req.user) {
            req.flash('success_msg', 'Зря Вы это сделали');
           return  res.redirect('/')
        }
        else {return res.redirect('/users/main')}
    }
};
