const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//before beforeEach - функции для mocha - для тестирования соединения с базой, можно обойтись без них

//before(done => {
    "use strict";
    mongoose.connect('mongodb://localhost:27017/bookList');
    mongoose.connection.once('open', ()=>{
            console.log('Подключились к базе данных');
            //done();
        }
    ).on('error', err=>{
        console.log('Connection error:', err)
    });
    module.exports.mongoose =  mongoose;

//});
//настраиваем хук для тестирования, очищаем коллекции перед каждым запуском теста

/*beforeEach((done)=>{
    //удаление коллекции документов bookLists

    mongoose.connection.collections.users.drop(()=>{
        done();
    })
});*/

