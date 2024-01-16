const asyncHandler = require('express-async-handler') // to avoid writing try/catch 
const _ = require('lodash');
const { Author, validateAuthor } = require('../models/author');


// @desc Get all authors
// @route GET /authors
// @access Public
const getAllAuthors = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: res.paginatedResults});
});

// @desc Create a author
// @route POST /authors
// @access Private
const createNewAuthor = async (req, res) => {
  try {
    const { error } = validateAuthor(req.body);
    if (error)
      return res.status(400).json({
        success: false,
        error: { code: 400, message: error.details[0].message}
      });
    // console.log(req.body);
    const { firstname, lastname, bio, birthDate, nationality, img, socials } = req.body;
    
    let newAuthor = new Author({
      firstname, lastname, bio, birthDate, nationality, img, socials
    })

    newAuthor = await newAuthor.save();

    if (!newAuthor)
      return res.status(400).json({
        success: false,
        error: { code: 400, message: 'An error occured' }
      });

    newAuthor = _.pick(newAuthor, ['_id', 'firstname', 'lastname']);
    res.status(201).json({success: true, data: newAuthor});
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

// @desc Get a author
// @route GET /authors/:id
// @access Public
const getAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;

    if (!authorId) {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: "Author ID required"}
      })
    }
     
    const author = await Author.findById(authorId)
    
    if (!author) return res.status(404).json({
      success: false, 
      error: {
        code: 404,
        message: 'The author with the given ID was not found'
      }
    });
    
    res.status(200).json({ success: true, data: author});
  } catch(err) {
    console.log(err)
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: 'Invalid author ID'}
      });
    }
    res.status(500).json({
      success: false,
      error: { code: 500, message: 'Internal Server Error'}
    });
  }
};

// @desc Update a author
// @route PUT /authors/:id
// @access Private
const updateAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;

    if (!authorId) {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: "Author ID required"}
      });
    }

    const { error } = validateAuthor(req.body);
    if (error) return res.status(400).json({
      success: false,
      error: { code: 400, message: error.details[0].message}
    });
    
    const { firstname, lastname, bio, birthDate, nationality, img, socials} = req.body;

    const author = await Author.findByIdAndUpdate(
      authorId,
      {
        firstname, lastname, bio, birthDate, nationality, img, socials
      },
      { new: true}
    );
      
    if (!author) return res.status(404).json({
      success: false,
      error: { code: 404, message: "The author with given ID doesn't exist"}
    });
      
    res.json({ success: true, message: `The author with ID ${author._id} is updated`});
  } catch(err) {
    console.log(err)
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: 'Invalid author ID'}
      });
    }
    res.status(500).json({
      success: false,
      error: { code: 500, message: 'Internal Server Error'}
    });
  }
};

// @desc Delete a author
// @route DELETE /authors/:id
// @access Private
const deleteAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;

    if (!authorId) {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: "Author ID required"}
      })
    }
  
    const author = await Author.findByIdAndRemove(authorId);
  
    if(!author) return res.status(404).json({
      success: false,
      error: { code: 404, message: 'The author with given ID is not found'}
    })
  
    res.status(200).json({
      success: true,
      message: `The author with ID ${author._id} was deleted`
    });

  } catch(err) {
    console.log(err)
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: 'Invalid author ID'}
      });
    }
    res.status(500).json({
      success: false,
      error: { code: 500, message: 'Internal Server Error'}
    });
  }
};


module.exports = {
  getAllAuthors,
  getAuthor,
  createNewAuthor,
  updateAuthor,
  deleteAuthor,
}
