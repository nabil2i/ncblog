import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import Book from "../models/book.js";
import Genre, { validateGenre } from "../models/genre.js";
import { IUser } from "../models/user.js";
import { makeError } from "../utils/error.js";

interface CustomResponse extends Response{
  paginatedResults?: any;
}

interface CustomRequest extends Request {
// interface CustomRequest extends Request<ParamsDictionary, any, any, ParsedQs> {
  user: IUser
}

interface PickedGenre {
  _id: string;
  name: string;
}

// @desc Get all genres
// @route GET /genres
// @access Private
export const getAllGenres = async (req: Request, res: CustomResponse, next: NextFunction) => {
  res.status(200).json({ success: true, data: res.paginatedResults});
};

// @desc Create a category
// @route POST /genres
// @access Private
export const createNewGenre = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = validateGenre(req.body);
    if (error) return next(makeError(400, error.details[0].message));

    // console.log(req.body);
    const { name } = req.body;
    
    let newGenre = new Genre({
      name
    })
    
    newGenre = await newGenre.save();

    if (!newGenre) return next(makeError(400, "An error occured"));
  
    const pickedGenre: PickedGenre = _.pick(newGenre.toObject(), ['_id', 'name']);
    res.status(201).json({success: true, data: pickedGenre});
  } catch(err) {
    console.log(err)
    return next(makeError(500, "Internal Server Error"));
  }
};

// @desc Get a genre
// @route GET /genres/:id
// @access Private
export const getGenre = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const genreId = req.params.id;

    if (!genreId)return next(makeError(400, "Genre ID required"));
     
    const genre = await Genre.findById(genreId)
    
    if (!genre) return next(makeError(404, "The genre with the given ID was not found"));
    
    res.status(200).json({ success: true, data: genre});
  } catch(err) {
    console.log(err)
    return next(makeError(500, "Internal Server Error"));
  }
};

// @desc Update a genre
// @route PUT /genres/:id
// @access Private
export const updateGenre = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const genreId = req.params.id;

    if (!genreId) return next(makeError(400, "Genre ID required"));

    const { error } = validateGenre(req.body);
    if (error) return next(makeError(400, error.details[0].message));
    
    const { name } = req.body;

    const genre = await Genre.findByIdAndUpdate(
      genreId,
      {
        name
      },
      { new: true}
    );
      
    if (!genre) return next(makeError(404, "The genre with given ID doesn't exist"));

    res.json({ success: true, message: `The genre with ID ${genre._id} is updated`});
  } catch(err) {
    console.log(err)
    return next(makeError(500, "Internal Server Error"));
  }
};

// @desc Delete a genre
// @route DELETE /genres/:id
// @access Private
export const deleteGenre = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const genreId = req.params.id;

    if (!genreId) return next(makeError(400, "Genre ID required"));
  
    const book = await Book.findOne({ genre: genreId }).lean().exec();

    if (book) return next(makeError(404, "Genre has books"));

    const genre = await Genre.findByIdAndDelete(genreId);
  
    if(!genre) return next(makeError(404, "The genre with given ID is not found"));

    res.status(200).json({
      success: true,
      message: `The genre with ID ${genre._id} was deleted`
    });

  } catch(err) {
    console.log(err)
    return next(makeError(500, "Internal Server Error"));
  }
};
