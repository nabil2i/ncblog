const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 20
  },
  email: {
    type: String,
    // required: true,
    unique: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  isAdmin: {
    type: Boolean,
  },
  firstname: {
    type: String,
    // required: true,
    minlength: 5,
    maxlength: 50
  },
  lastname: {
    type: String,
    // required: true,
    minlength: 5,
    maxlength: 50
  },
});

// instance method 
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.NODE_APP_JWT_SECRET);
    // config.get(process.env.JWT_SECRET));
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(20).required(),
    email: Joi.string().min(5).max(255).email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
exports.userSchema = userSchema;
