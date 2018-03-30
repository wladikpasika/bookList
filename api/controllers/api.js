const removeBook = require('../models/BookList').removeBook;
const findBooks = require('../models/BookList').findBooks;


module.exports = {
    deleteBook(req, res, next){
        removeBook({id:req.param('id')}).then(result => {
            res.send('Книга удалена');
        }).catch(err =>{
            res.send(404,'Ошибка удаления или книги не существовало');
        })
    },
    findBook(req, res, next){
        return  findBooks(condition={}).then(books =>{
            res.send(books)
        }).catch(err => {
            res.send(404, err)
        });
    }
};