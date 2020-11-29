var express = require('express');
var router = express.Router();

const book = require('../models/book.model');

// display books page
router.get('/', async (req, res) => {
    await book.getBooks()
        .then(books => {
            res.render('books',{data:books});
        })
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
});

// display add book page
router.get('/add', function(req, res, next) {    
    // render to add.ejs
    res.render('books/add', {
        name: '',
        author: ''        
    })
});

// add a new book
router.post('/add', async (req, res) => {
    await book.insertBook(req.body)
        .then(books => {
            req.flash('success', 'Book successfully added');
            res.redirect('/books');
        })
        .catch(err => res.status(500).json({ message: err.message }))
});

// display edit book page
router.get('/edit/(:id)', async (req, res) => {
    const id = req.params.id;
    await book.getBook(id)
        .then(books => {
            res.render('books/edit', {
                title: 'Edit Book',
                id: books.id,
                name: books.name,
                author: books.author
            });
        })
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
});

// update book data
router.post('/update/:id', async (req, res) => {
    const id = req.params.id
    await book.updateBook(id, req.body)
        .then(books => {
            req.flash('success', 'Book successfully updated');
            res.redirect('/books');
        })
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
});
   
// delete book
router.get('/delete/(:id)', async (req, res) => {

    const id = req.params.id;
    await book.deleteBook(id)
        .then(post => {
            req.flash('success', 'Book successfully deleted! ID = ' + id)
            res.redirect('/books')
        })
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
});

module.exports = router;