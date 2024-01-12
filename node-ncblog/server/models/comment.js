
const Joi = require('joi');
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  }
}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema);

function validateComment(comment) {
  const schema = Joi.object({
    text: Joi.string().min(2).required(),
    userId: Joi.object.objectId().required(),
    parentCommentId: Joi.string().hex().length(24),
  })
  return schema.validate(comment)
}

module.exports.Comment = Comment 
module.exports.validateComment = validateComment 
module.exports.commentSchema = commentSchema
