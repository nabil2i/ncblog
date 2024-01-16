const mongoose = require('mongoose');
const Joi = require('joi');


const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
    unique: true
  },

  },
  { timestamps: true },
);

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(20).required(),
  });

  return schema.validate(genre);
}

exports.Genre = Genre;
exports.validateGenre = validateGenre;
exports.genreSchema = genreSchema;
