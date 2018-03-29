const mocha = require('mocha');
const assert = require('assert');
const User = require('../api/models/User');


describe('Сохранение данных',()=>{

    it('Запись данных в базу данных',(done)=>{
        let char = new User({
            login: 'wladikpasika',
        });

        char.save().then(()=>{
            console.log('Ответ от базы дынных есть');
            assert(char.isNew === false);
            done();
        });
    })
});