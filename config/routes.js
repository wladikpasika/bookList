const express = require('express'),
    router = express.Router(),
    MainController  = require('../api/controllers/MainController'),
    ViewController  = require('../api/controllers/ViewController');
    router.get('/',(req,res,next)=>{
    return ViewController.homepage(req,res,next)
    });
    router.post('/login',(req,res,next)=>{
    return MainController.login(req,res,next)
    });
    router.get('/logout',(req,res,next)=>{
    return MainController.logout(req,res,next)
    });
    router.get('/registration',(req,res,next)=>{
    return ViewController.registration(req,res,next)
    });
    router.post('/registration',(req,res,next)=>{
    return MainController.registration(req,res,next)
    });
    router.get('/user/:id',(req,res,next)=>{
    return ViewController.user(req,res,next)
    });
    router.get('*',(req,res,next)=>{
        "use strict";
        return res.render('404')
    });

module.exports = router;

