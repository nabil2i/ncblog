import _ from "lodash";
import Author, { validateAuthor } from "../models/author.js";
import { makeError } from "../utils/responses.js";

// @desc Get all authors
// @route GET /authors
// @access Public
export const getAllAuthors = async (req, res) => {
  res.status(200).json({ success: true, data: res.paginatedResults});
};

// @desc Create a author
// @route POST /authors
// @access Private
export const createNewAuthor = async (req, res, next) => {
  try {
    const { error } = validateAuthor(req.body);
    if (error) return next(makeError(400,  error.details[0].message));
    // console.log(req.body);
    const { firstname, lastname, bio, birthDate, nationality, img, socials } = req.body;
    
    let newAuthor = new Author({
      firstname, lastname, bio, birthDate, nationality, img, socials
    })

    newAuthor = await newAuthor.save();

    if (!newAuthor) return next(makeError(400, "An error occured"));

    newAuthor = _.pick(newAuthor, ['_id', 'firstname', 'lastname']);
    res.status(201).json({success: true, data: newAuthor});
  } catch(err) {
    console.log(err)
    return next(makeError(500, "Internal Server Error"));
  }
};

// @desc Get a author
// @route GET /authors/:id
// @access Public
export const getAuthor = async (req, res, next) => {
  try {
    const authorId = req.params.id;

    if (!authorId) return next(makeError(400,  "Author ID required"));
     
    const author = await Author.findById(authorId)
    
    if (!author) return next(makeError(404, "The author with the given ID was not found"));
    
    res.status(200).json({ success: true, data: author});
  } catch(err) {
    console.log(err)
    return next(makeError(500, "Internal Server Error"));
  }
};

// @desc Update a author
// @route PUT /authors/:id
// @access Private
export const updateAuthor = async (req, res, next) => {
  try {
    const authorId = req.params.id;

    if (!authorId) return next(makeError(400, "Author ID required"));

    const { error } = validateAuthor(req.body);
    if (error) return next(makeError(400, error.details[0].message));
    
    const { firstname, lastname, bio, birthDate, nationality, img, socials} = req.body;

    const author = await Author.findByIdAndUpdate(
      authorId,
      {
        firstname, lastname, bio, birthDate, nationality, img, socials
      },
      { new: true}
    );
      
    if (!author) return next(makeError(404, "The author with given ID doesn't exist"));
      
    res.json({ success: true, message: `The author with ID ${author._id} is updated`});
  } catch(err) {
    console.log(err)
    return next(makeError(500, "Internal Server Error"));
  }
};

// @desc Delete a author
// @route DELETE /authors/:id
// @access Private
export const deleteAuthor = async (req, res, next) => {
  try {
    const authorId = req.params.id;

    if (!authorId) return next(makeError(400, "Author ID required"));
  
    const author = await Author.findByIdAndDelete(authorId);
  
    if(!author) return next(makeError(404, "The author with given ID is not found"));
  
    res.status(200).json({
      success: true,
      message: `The author with ID ${author._id} was deleted`
    });

  } catch(err) {
    console.log(err)
    return next(makeError(500, "Internal Server Error"));
  }
};
