const mongoose = require('mongoose');
const Joi = require('joi');


const authorSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  lastname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  bio: {
    type: String,
    required: true,
    minlength: 5,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  birthDate: {
    type: Date,
  },
  nationality: {
    type: String,
  },
  img: {
    type: String,
  },
  socials: [{
    type: String,
  }],

  },
  { timestamps: true },
);

const Author = mongoose.model('Author', authorSchema);

function validateAuthor(author) {
  const schema = Joi.object({
    firstname: Joi.string().min(2).max(50).required(),
    lastname: Joi.string().min(2).max(50).required(),
    bio: Joi.string().min(5).required(),
    
  });

  return schema.validate(author);
}

exports.Author = Author;
exports.validateAuthor = validateAuthor;
exports.authorSchema = authorSchema;
