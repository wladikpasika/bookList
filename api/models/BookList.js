const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const connect = require('../../config/connection');

const bookListSchema = new Schema({
    title: String,
    year: Number,
    author: String,
});

const bookList = mongoose.model('bookList', bookListSchema);


module.exports = bookList;
