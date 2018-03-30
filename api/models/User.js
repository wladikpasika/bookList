const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema,
    saltRounds = 10,
    autoincrement = require('simple-mongoose-autoincrement'),
    connect = require('../../config/connection');

const userSchema = new Schema({
    login: {
        type: String,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
});
//добавляем автоинкримент для документов
userSchema.plugin(autoincrement, {field: 'id'});
module.exports.user = mongoose.model('users', userSchema);
module.exports.createUser = function(newUser){
    return new Promise((resolve,reject)=>{
        return bcrypt.hash(newUser.password, saltRounds).then(hash => {
            newUser.password = hash;
            return newUser.save((err,result) => {
                if(err)return reject (err);
                return resolve(result);
            });
        }, err => {return reject (err)});
    });
};
