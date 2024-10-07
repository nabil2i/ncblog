import dotenv from "dotenv";
import Joi from "joi";
import mongoose from "mongoose";

dotenv.config();

export const likeCommentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  },
  { timestamps: true },
);

const LikeCommentModel = mongoose.model('LikeComment', likeCommentSchema);

export function validateLikeComment(likeComment: typeof LikeCommentModel) {
  const schema = Joi.object({
    userId: Joi.string().hex().length(24).required(),
    commentId: Joi.string().hex().length(24).required(),
  });

  return schema.validate(likeComment);
}

export default LikeCommentModel
