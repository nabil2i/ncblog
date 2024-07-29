import _ from "lodash";
import Author from "../models/author";
import Book, { validateBook } from "../models/book";
import { makeError } from "../utils/responses";
import { Request, Response, NextFunction } from "express"; 
 
interface CustomResponse extends Response{
  paginatedResults?: any;
}

interface PickedBook {
  _id: string;
  title: string;
}

// @desc Get all books
// @route GET /books
// @access Public
export const getAllBooks = async (req: Request, res: CustomResponse) => {
  res.status(200).json({ success: true, data: res.paginatedResults});
};

// @desc Create a book
// @route POST /books
// @access Private
export const createNewBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = validateBook(req.body);
    if (error) return next(makeError(400, error.details[0].message));

    // console.log(req.body);
    const { title, about, authorId, img } = req.body;

    const author = await Author.findById(authorId);
    if (!author) return next(makeError(400, "Invalid author"));
    
    let newBook = new Book({
      author: authorId,
      title,
      about,
      img
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

    if (!newBook) return next(makeError(400, "An error occured"));

    const pickedBook: PickedBook = _.pick(newBook.toObject(), ['_id', 'title']);
    res.status(201).json({success: true, data: pickedBook});
  } catch(err) {
    console.log(err)
    return next(makeError(500, "Internal Server Error"));
  }
};

// @desc Get a book
// @route GET /books/:id
// @access Public
export const getBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.id;

    if (!bookId) return next(makeError(400, "Book ID required"));
     
    const book = await Book.findById(bookId)
      .populate([
        {
          path: 'author',
          select: 'firstname lastname bio',
        },
      ])
      .exec();
    
    if (!book) return next(makeError(404, "The book with the given ID was not found"));
    
    res.status(200).json({ success: true, data: book});
  } catch(err) {
    console.log(err)
    return next(makeError(500, "Internal Server Error"));
  }
};

// @desc Update a book
// @route PUT /books/:id
// @access Private
export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.id;

    if (!bookId) return next(makeError(400, "Book ID required"));

    const { error } = validateBook(req.body);
    if (error) return next(makeError(400, error.details[0].message));
    
    const { title, about, authorId } = req.body;

    const book = await Book.findByIdAndUpdate(
      bookId,
      {
        title,
        about,
      },
      { new: true}
    );
      
    if (!book) return next(makeError(404, "The book with given ID doesn't exist"));
      
    res.json({ success: true, message: `The book with ID ${book._id} is updated`});
  } catch(err) {
    console.log(err)
    return next(makeError(500, "Internal Server Error"));
  }
};

// @desc Delete a book
// @route DELETE /books/:id
// @access Private
export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.id;

    if (!bookId) return next(makeError(400, "Book ID required"));
  
    const book = await Book.findByIdAndDelete(bookId);
  
    if(!book) return next(makeError(404, "The book with given ID is not found"));
  
    res.status(200).json({
      success: true,
      message: `The book with ID ${book._id} was deleted`
    });

  } catch(err) {
    console.log(err)
    return next(makeError(500, "Internal Server Error"));
  }
};
