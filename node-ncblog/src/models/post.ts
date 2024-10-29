import Joi from "joi";
import mongoose, { Model } from "mongoose";
// import AutoIncrement from "mongoose-sequence";
import dotenv from "dotenv";
import { Document } from "mongoose";

dotenv.config();

export interface IPost extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  body: string;
  img: string;
  slug: string;
  postAuthorId: mongoose.Types.ObjectId;
  comments: mongoose.Types.ObjectId[];
  tags: string[];
  category: string;
  isDraft: boolean;
  // likes: string[];
  likeCount: number;
  commentCount: number;
  status: string;
  publishedAt: Date;
}

// const AutoIncrementCounter = AutoIncrement(mongoose);

export const postSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255,
    trim: true,
  },
  body: {
    type: String,
    required: true,
    minlength: 5,
    trim: true,
  },
  img: {
    type: String,
    default: "https://firebasestorage.googleapis.com/v0/b/ncblog-b9e81.appspot.com/o/defaultblogimage.jpg?alt=media&token=83769dd6-ac79-45ec-88da-da6722f869f1"
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  postAuthorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  tags: {
    type: [String],
    default: []
  },
  category: {
    type: String,
    default: "Uncategorized"
  },
  
  // category: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Category',
  //   default: new mongoose.Types.ObjectId(process.env.NODE_APP_DEFAULT_CATEGORY)
  // },
  likeCount: {
    type: Number,
    default: 0
  },
  commentCount: {
    type: Number,
    default: 0
  },
  status: { 
    type: String, 
    enum: ['draft', 'published'], 
    default: 'draft' 
  },
  deletionStatus: { 
    type: String, 
    enum: ['active', 'deleted', 'archived'], 
    default: 'active' 
  },
  publishedAt: { 
    type: Date,
    default: null
  },
  deletedAt: { 
    type: Date,
    default: null
  },
  },
  { timestamps: true },
);

// postSchema.virtual('url').get(function(){
//   return '/post/' + this._id
// })

// postSchema.plugin(AutoIncrementCounter, {
//   inc_field: 'ticket',
//   id: 'ticketNums',
//   start_seq: 500
// })

// postSchema.statics.lookup = function(userId) {
//   return this.findOne({
//     'user._id': userId
//   });
// }

// const PostModel = mongoose.model('Post', postSchema);
const PostModel: Model<IPost> = mongoose.model<IPost>('Post', postSchema);

export function validatePost(post: typeof PostModel) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    body: Joi.string().min(5).required(),
    authorId: Joi.string().hex().length(24).required(),
    // userId: Joi.object.objectId().required(),
    img: Joi.string().min(5),
    category: Joi.string().min(5),
    tags: Joi.string().min(5),
  });

  return schema.validate(post);
}

export function validateUpdatePost(post: typeof PostModel) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255),
    body: Joi.string().min(5),
    // authorId: Joi.string().hex().length(24),
    postAuthorId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    img: Joi.string().min(5),
    category: Joi.string().min(5),
    tags: Joi.string().min(5),
  });

  return schema.validate(post);
}

export default PostModel
