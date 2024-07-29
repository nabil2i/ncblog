import Joi from "joi";
import mongoose, { Model, Types } from "mongoose";

export interface IComment extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  userRepliedTo: Types.ObjectId;
  parentComment: Types.ObjectId;
  replies: Types.ObjectId[];
  post: Types.ObjectId;
  isReply: boolean;
  likes: string[];
  numberOfLikes: number;
}

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
  userRepliedTo:{
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: 'User',
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
  isReply: {
    type: Boolean,
    default: false,
  },
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

// const CommentModel = mongoose.model('Comment', commentSchema);
const CommentModel: Model<IComment> = mongoose.model<IComment>('Comment', commentSchema);

export function validateComment(comment: typeof CommentModel) {
  const schema = Joi.object({
    text: Joi.string().min(2).required(),
    userId: Joi.string().hex().length(24).required(),
    userRepliedTo: Joi.string().hex().length(24),
    // userId: Joi.object.objectId().required(),
    parentCommentId: Joi.string().hex().length(24).optional().allow(null, ''),
  })
  return schema.validate(comment)
}

export function validateUpdateComment(comment: typeof CommentModel) {
  const schema = Joi.object({
    text: Joi.string().min(2).required(),
    userId: Joi.string().hex().length(24),
    parentCommentId: Joi.string().hex().length(24).optional().allow(null, ''),
  })
  return schema.validate(comment)
}

export default CommentModel
