const userModel = require('../../models/User').user,
    bcrypt = require('bcrypt');


//рассписать, что здесь происходит, трудно читать будет
module.exports = function(email, password) {
    return new Promise((resolve, reject)=>{
        return userModel.findOne({email:email}).then(result => {
            if(result && result.email === email){
                return bcrypt.compare(password, result.password).then(passwordIsTrue =>{
                    if(passwordIsTrue) {return resolve(result)};
                    return reject('Неверный пароль');
                }).catch(err => {
                    return reject(err)
                });
            }
            else{
                return reject('Пользователь не найден');
            }
        }).catch(err => {
              return reject(err)
        })
    });
};