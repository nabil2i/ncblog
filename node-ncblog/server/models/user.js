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
  roles: [{
    type: String,
    default: "Normal"
  }],
  isActive: {
    type: Boolean,
    default: true
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
}, { timestamps: true });

// instance method 
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, roles: this.roles, isActive: this.isActive },
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
    isActive: Joi.boolean(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
exports.userSchema = userSchema;
