import mongoose from "mongoose";
import Joi from "joi";
// import AutoIncrement from "mongoose-sequence";
import dotenv from "dotenv";

dotenv.config();

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
  // user: {
  //   type: new mongoose.Schema({
  //     firstname: {
  //       type: String,
  //       required: true,
  //       minlength: 5,
  //       maxlength: 50
  //     },
  //     lastname: {
  //       type: String,
  //       required: true,
  //       minlength: 5,
  //       maxlength: 50
  //     },
  //   }),
  //   required: true
  // },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  tags: {
    type: Array,
    default: [],
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
  likes: {
    type: Array,
    default: [],
  },
  numberOfLikes: {
    type: Number,
    default: 0
  },
  totalCommentsCount: {
    type: Number,
    default: 0
  }
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

const Post = mongoose.model('Post', postSchema);

export function validatePost(post) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    body: Joi.string().min(5).required(),
    userId: Joi.string().hex().length(24).required(),
    // userId: Joi.object.objectId().required(),
    img: Joi.string().min(5),
    category: Joi.string().min(5),
    tags: Joi.string().min(5),
  });

  return schema.validate(post);
}

export function validateUpdatePost(post) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255),
    body: Joi.string().min(5),
    userId: Joi.string().hex().length(24),
    img: Joi.string().min(5),
    category: Joi.string().min(5),
    tags: Joi.string().min(5),
  });

  return schema.validate(post);
}

export default Post
