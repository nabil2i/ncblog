import mongoose from "mongoose";
import Joi from "joi";

export const commentSchema = new mongoose.Schema({
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
  replyToComment:{
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: 'Comment',
  },
  parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      default: null
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  // replies: [{
  //   user: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'User',
  //     required: true,
  //   },
  //   parentComment: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Comment',
  //     required: true,
  //   },
  //   text: {
  //     type: String,
  //     required: true,
  //     trim: true,
  //   },
  //   replyingTo:{
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'User',
  //     required: true,
  //   }
  // }],
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  numberOfLikes: {
    type: Number,
    default: 0
  }
}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema);

export function validateComment(comment) {
  const schema = Joi.object({
    text: Joi.string().min(2).required(),
    userId: Joi.string().hex().length(24).required(),
    replyToComment: Joi.string().hex().length(24),
    // userId: Joi.object.objectId().required(),
    parentCommentId: Joi.string().hex().length(24),
  })
  return schema.validate(comment)
}

export function validateUpdateComment(comment) {
  const schema = Joi.object({
    text: Joi.string().min(2).required(),
    userId: Joi.string().hex().length(24),
    parentCommentId: Joi.string().hex().length(24),
  })
  return schema.validate(comment)
}

export default Comment
