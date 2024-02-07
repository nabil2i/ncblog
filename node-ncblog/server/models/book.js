import mongoose from "mongoose";
import Joi from "joi"


export const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255,
    trim: true,
  },
  slug: {
    type: String,
    // required: true,
    unique: true
  },
  about: {
    type: String,
    required: true,
    minlength: 5,
    trim: true,
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genre"
  },
  img: {
    type: String,
    default: ""
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author"
  },
  publishedYear: {
    type: Date,
  },
  isbn: {
    type: String,
  },
  link: {
    type: String,
  },

  },
  { timestamps: true },
);

const Book = mongoose.model('Book', bookSchema);

export function validateBook(book) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    about: Joi.string().min(5).required(),
    authorId: Joi.string().hex().length(24).required(),
    genreId: Joi.string().hex().length(24),
    link: Joi.string().min(10)
  });

  return schema.validate(book);
}

export default Book
