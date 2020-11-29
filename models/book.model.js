let books = require('../data/books.json');
const filename = './data/books.json';
const helper = require('../helpers/helper.js');

function getBooks() {
    // return books;
    return new Promise((resolve, reject) => {
        resolve(books)
    })
}

function getBook(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(books, id)
            .then(post => resolve(post))
            .catch(err => reject(err))
    })
}

function insertBook(newBook) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(books) };
        newBook = { ...id, ...newBook };
        books.push(newBook);
        helper.writeJSONFile(filename, books);
        resolve(newBook)
    })
}

function updateBook(id, newBook) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(books, id)
            .then(post => {
                const index = books.findIndex(p => p.id === post.id);
                id = { id: post.id };
                books[index] = { ...id, ...newBook };
                helper.writeJSONFile(filename, books);
                resolve(books[index])
            })
            .catch(err => reject(err))
    })
}

function deleteBook(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(books, id)
            .then(() => {
                books = books.filter(p => p.id != id);
                console.log(books);
                helper.writeJSONFile(filename, books);
                resolve()
            })
            .catch(err => reject(err))
    })
}

module.exports = {
    insertBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook
};