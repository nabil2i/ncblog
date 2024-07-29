import dotenv from "dotenv";
import Joi from "joi";
import mongoose from "mongoose";

dotenv.config();

export const likePostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  },
  { timestamps: true },
);



const LikePostModel = mongoose.model('LikePost', likePostSchema);

export function validateLikePost(likePost: typeof LikePostModel) {
  const schema = Joi.object({
    userId: Joi.string().hex().length(24).required(),
    postId: Joi.string().hex().length(24).required(),
  });

  return schema.validate(likePost);
}

export default LikePostModel
