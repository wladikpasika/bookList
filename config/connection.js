const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

    mongoose.connect('mongodb://localhost:27017/bookList');
    mongoose.connection.once('open', ()=>{
            console.log('Подключились к базе данных');
            //done();
        }
    ).on('error', err=>{
        console.log('Connection error:', err)
    });
    module.exports.mongoose =  mongoose;

