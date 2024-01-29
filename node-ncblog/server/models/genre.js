import mongoose from "mongoose";
import Joi from "joi";

export const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    unique: true
  },

  },
  { timestamps: true },
);

const Genre = mongoose.model('Genre', genreSchema);

export function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
  });

  return schema.validate(genre);
}

export default Genre
