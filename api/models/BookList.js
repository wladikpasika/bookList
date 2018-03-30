const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    connect = require('../../config/connection'),
    autoincrement = require('simple-mongoose-autoincrement');

const bookListSchema = new Schema({
    title: String,
    year: Number,
    author: String,
});
bookListSchema.plugin(autoincrement, {field: 'id'});
let newBook = mongoose.model('bookList', bookListSchema);
module.exports.bookList = newBook;
module.exports.createBook = function(newBook){
        return new Promise((resolve,reject)=>{
                return newBook.save((err,result) => {
                    if(err===null){return resolve(result)}
                    else if(err){return reject(err)}
                });
        });
    };
module.exports.findBooks = function(condition){
    return new Promise((resolve,reject)=>{
        return newBook.find(condition,(err,result) => {
            if(result||err===null){return resolve(result)}
            else if(err){return reject(err)}
        });
    });
};
module.exports.removeBook = function(condition){
    return new Promise((resolve,reject)=>{
        return newBook.remove(condition,(err,result) => {
            if(result||err===null){return resolve(result)}
            else if(err){return reject(err)}
        });
    });
};
