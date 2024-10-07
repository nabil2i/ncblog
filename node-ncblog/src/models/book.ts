import Joi from "joi";
import mongoose, { Schema } from "mongoose";


export const bookSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255,
    trim: true,
  },
  subtitle: {
    type: String,
    required: false,
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
  genreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genre"
  },
  img: {
    type: [String],
    default: [""]
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author"
  },
  publisher: {
    type: String,
  },
  publicationDate: {
    type: Date,
  },
  language: {
    type: String,
  },
  pageCount: {
    type: Number
  },
  size: {
    type: Number
  },
  dimensions: {
    type: String
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

const BookModel = mongoose.model('Book', bookSchema);

export function validateBook(book: typeof BookModel) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    about: Joi.string().min(5).required(),
    authorId: Joi.string().hex().length(24).required(),
    genreId: Joi.string().hex().length(24),
    link: Joi.string().min(10)
  });

  return schema.validate(book);
}

export default BookModel
