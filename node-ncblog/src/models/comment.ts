import Joi from "joi";
import mongoose, { Model, Types } from "mongoose";

export interface IComment extends Document {
  _id: Types.ObjectId;
  text: string;
  userId: Types.ObjectId;
  userRepliedToId: Types.ObjectId;
  topParentCommentId: Types.ObjectId;
  realParentCommentId: Types.ObjectId;
  replies: Types.ObjectId[];
  postId: Types.ObjectId;
  replyCount: number;
  // likes: string[];
  likeCount: number;
}

export const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // likes: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User"
  // }],
  likeCount: {
    type: Number,
    default: 0
  },
  isDeleted: { type: Boolean, default: false },
  topParentCommentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },
  realParentCommentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },
  userRepliedToId:{
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: 'User',
  },
  replies: { // only 1 level of replies 
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Comment",
    default: []
  },
  replyCount: {
    type: Number,
    default: 0 
  }
}, { timestamps: true })

// const CommentModel = mongoose.model('Comment', commentSchema);
const CommentModel: Model<IComment> = mongoose.model<IComment>('Comment', commentSchema);
commentSchema.index({ postId: 1 });

export function validateComment(comment: typeof CommentModel) {
  const schema = Joi.object({
    text: Joi.string().min(2).required(),
    // postId: Joi.string().hex().length(24).required(),
    userId: Joi.string().hex().length(24).required(),
    userRepliedToId: Joi.string().hex().length(24).optional().allow(null, ''),
    topParentCommentId: Joi.string().hex().length(24).optional().allow(null, ''),
    realParentCommentId: Joi.string().hex().length(24).optional().allow(null, ''),
  })
  return schema.validate(comment)
}

export function validateUpdateComment(comment: typeof CommentModel) {
  const schema = Joi.object({
    text: Joi.string().min(2).required(),
    userId: Joi.string().hex().length(24),
    topParentCommentId: Joi.string().hex().length(24).optional().allow(null, ''),
    realParentCommentId: Joi.string().hex().length(24).optional().allow(null, ''),
  })
  return schema.validate(comment)
}

export default CommentModel
