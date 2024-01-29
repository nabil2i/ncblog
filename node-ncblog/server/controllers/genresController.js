import _ from "lodash";
import Book from "../models/book.js";
import Genre, { validateGenre } from "../models/genre.js";


// @desc Get all genres
// @route GET /genres
// @access Private
export const getAllGenres = async (req, res) => {
  res.status(200).json({ success: true, data: res.paginatedResults});
};

// @desc Create a category
// @route POST /genres
// @access Private
export const createNewGenre = async (req, res) => {
  try {
    const { error } = validateGenre(req.body);
    if (error)
      return res.status(400).json({
        success: false,
        error: { code: 400, message: error.details[0].message}
      });
    // console.log(req.body);
    const { name } = req.body;
    
    let newGenre = new Genre({
      name
    })
    
    newGenre = await newGenre.save();

    if (!newGenre)
      return res.status(400).json({
        success: false,
        error: { code: 400, message: 'An error occured' }
      });

    newGenre = _.pick(newGenre, ['_id', 'name']);
    res.status(201).json({success: true, data: newGenre});
  } catch(err) {
    console.log(err)
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: 'Invalid post ID' }
      });
    }
    res.status(500).json({
      success: false,
      error: { code: 500, message: err.errors}
    });
  }
};

// @desc Get a genre
// @route GET /genres/:id
// @access Private
export const getGenre = async (req, res) => {
  try {
    const genreId = req.params.id;

    if (!genreId) {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: "Genre ID required"}
      })
    }
     
    const genre = await Genre.findById(genreId)
    
    if (!genre) return res.status(404).json({
      success: false, 
      error: {
        code: 404,
        message: 'The genre with the given ID was not found'
      }
    });
    
    res.status(200).json({ success: true, data: genre});
  } catch(err) {
    console.log(err)
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: 'Invalid genre ID'}
      });
    }
    res.status(500).json({
      success: false,
      error: { code: 500, message: 'Internal Server Error'}
    });
  }
};

// @desc Update a genre
// @route PUT /genres/:id
// @access Private
export const updateGenre = async (req, res) => {
  try {
    const genreId = req.params.id;

    if (!genreId) {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: "Genre ID required"}
      });
    }

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).json({
      success: false,
      error: { code: 400, message: error.details[0].message}
    });
    
    const { name } = req.body;

    const genre = await Genre.findByIdAndUpdate(
      genreId,
      {
        name
      },
      { new: true}
    );
      
    if (!genre) return res.status(404).json({
      success: false,
      error: { code: 404, message: "The genre with given ID doesn't exist"}
    });
      
    res.json({ success: true, message: `The genre with ID ${genre._id} is updated`});
  } catch(err) {
    console.log(err)
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: 'Invalid genre ID'}
      });
    }
    res.status(500).json({
      success: false,
      error: { code: 500, message: 'Internal Server Error'}
    });
  }
};

// @desc Delete a genre
// @route DELETE /genres/:id
// @access Private
export const deleteGenre = async (req, res) => {
  try {
    const genreId = req.params.id;

    if (!genreId) {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: "Genre ID required"}
      })
    }
  
    const book = await Book.findOne({ genre: genreId }).lean().exec();

    if (book) {
      return res.status(404).json({
        success: false,
        error: { code: 404, message: 'Genre has books'}
      });
    }

    const genre = await Genre.findByIdAndRemove(genreId);
  
    if(!genre) return res.status(404).json({
      success: false,
      error: { code: 404, message: 'The genre with given ID is not found'}
    })
  
    res.status(200).json({
      success: true,
      message: `The genre with ID ${genre._id} was deleted`
    });

  } catch(err) {
    console.log(err)
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: 'Invalid genre ID'}
      });
    }
    res.status(500).json({
      success: false,
      error: { code: 500, message: 'Internal Server Error'}
    });
  }
};
