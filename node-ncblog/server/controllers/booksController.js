const asyncHandler = require('express-async-handler') // to avoid writing try/catch 
const _ = require('lodash');
const { Book, validateBook } = require('../models/book');
const { Author, validateAuthor } = require('../models/author');


// @desc Get all books
// @route GET /books
// @access Public
const getAllBooks = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: res.paginatedResults});
});

// @desc Create a book
// @route POST /books
// @access Private
const createNewBook = async (req, res) => {
  try {
    const { error } = validateBook(req.body);
    if (error)
      return res.status(400).json({
        success: false,
        error: { code: 400, message: error.details[0].message}
      });
    // console.log(req.body);
    const { title, about, authorId } = req.body;

    const author = await Author.findById(authorId);
    if (!author)
      return res.status(400).json({
        success: false,
        error: { code: 400, message: 'Invalid author'}
      });
    
    let newBook = new Book({
      author: authorId,
      title,
      about
    })
    // let newPost = new Post({
    //   user: {
    //     _id: user._id,
    //     firstname: user.firstname,
    //     lastname: user.lastname,
    //   },
    //   title,
    //   body
    // })
    newBook = await newBook.save();

    if (!newBook)
      return res.status(400).json({
        success: false,
        error: { code: 400, message: 'An error occured' }
      });

    newBook = _.pick(newBook, ['_id', 'title']);
    res.status(201).json({success: true, data: newBook});
  } catch(err) {
    console.log(err)
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: 'Invalid ID' }
      });
    }
    res.status(500).json({
      success: false,
      error: { code: 500, message: err.errors}
    });
  }
};

// @desc Get a book
// @route GET /books/:id
// @access Public
const getBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    if (!bookId) {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: "Book ID required"}
      })
    }
     
    const book = await Book.findById(bookId)
      .populate([
        {
          path: 'author',
          select: 'firstname lastname bio',
        },
      ])
      .exec();
    
    if (!book) return res.status(404).json({
      success: false, 
      error: {
        code: 404,
        message: 'The book with the given ID was not found'
      }
    });
    
    res.status(200).json({ success: true, data: book});
  } catch(err) {
    console.log(err)
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: 'Invalid book ID'}
      });
    }
    res.status(500).json({
      success: false,
      error: { code: 500, message: 'Internal Server Error'}
    });
  }
};

// @desc Update a book
// @route PUT /books/:id
// @access Private
const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    if (!bookId) {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: "Book ID required"}
      });
    }

    const { error } = validateBook(req.body);
    if (error) return res.status(400).json({
      success: false,
      error: { code: 400, message: error.details[0].message}
    });
    
    const { title, about, authorId } = req.body;

    const book = await Book.findByIdAndUpdate(
      bookId,
      {
        title,
        about,
      },
      { new: true}
    );
      
    if (!book) return res.status(404).json({
      success: false,
      error: { code: 404, message: "The book with given ID doesn't exist"}
    });
      
    res.json({ success: true, message: `The book with ID ${book._id} is updated`});
  } catch(err) {
    console.log(err)
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: 'Invalid book ID'}
      });
    }
    res.status(500).json({
      success: false,
      error: { code: 500, message: 'Internal Server Error'}
    });
  }
};

// @desc Delete a book
// @route DELETE /books/:id
// @access Private
const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    if (!bookId) {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: "Book ID required"}
      })
    }
  
    const book = await Book.findByIdAndRemove(bookId);
  
    if(!book) return res.status(404).json({
      success: false,
      error: { code: 404, message: 'The book with given ID is not found'}
    })
  
    res.status(200).json({
      success: true,
      message: `The book with ID ${book._id} was deleted`
    });

  } catch(err) {
    console.log(err)
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: 'Invalid book ID'}
      });
    }
    res.status(500).json({
      success: false,
      error: { code: 500, message: 'Internal Server Error'}
    });
  }
};


module.exports = {
  getAllBooks,
  getBook,
  createNewBook,
  updateBook,
  deleteBook,
}
