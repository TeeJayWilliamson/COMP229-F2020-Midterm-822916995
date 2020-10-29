/*
COMP229-F2020-MIDTERM-822916995
Trevor Williamson
822916995
https://comp229-f2020-midterm-82291699.herokuapp.com/
*/


// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const books = require('../models/books');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => { 
  /****************
  * MY CODE START *
  ****************/

  res.render('books/details', {title: 'Books', books: book})

    /******************
     * MY CODE FINISH *
     *****************/

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  /****************
  * MY CODE START *
  ****************/

  let newBook = book({
    "Title": req.body.title,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });

  book.create(newBook, (err, Book) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      res.redirect('/books');
    }
  });

    /******************
     * MY CODE FINISH *
     *****************/

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
  /****************
  * MY CODE START *
  ****************/
   let id = req.params.id;

    book.findById(id, (err, bookToEdit) => {
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else
      {
        res.render('./books/details', {title: 'Edit Book', books: bookToEdit})
      }
    });

    /******************
     * MY CODE FINISH *
     *****************/
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
  /****************
  * MY CODE START *
  ****************/
    let updatedBook = book({
      "_id": req.params.id, 
      "Title": req.body.title,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
    });

    let id = req.params.id;

    book.updateOne({_id: id}, updatedBook, (err) => {
      if(err)
      {
        console.log(err);
        red.end(err);
      }

      else
      {
        res.redirect('/books');
      }
    });

    /******************
     * MY CODE FINISH *
     *****************/

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  /****************
  * MY CODE START *
  ****************/
    let id = req.params.id;

    book.remove({_id: id}, (err, result) => {
      if(err)
      {
        console.log(err);
        res.end(err);
      }

      else
      {
        res.redirect('/books');
      }
    });

    /******************
     * MY CODE FINISH *
     *****************/
});


module.exports = router;
