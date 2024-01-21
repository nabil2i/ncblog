const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Joi = require('joi');


const postSchema = new mongoose.Schema({
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
  tags: [{

    type: String,
  }],

  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }],
  likes: {
    type: Number,
  },
  },
  { timestamps: true },
);

// postSchema.virtual('url').get(function(){
//   return '/post/' + this._id
// })

// postSchema.plugin(AutoIncrement, {
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

function validatePost(post) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    body: Joi.string().min(5).required(),
    userId: Joi.string().hex().length(24).required(),
    // userId: Joi.object.objectId().required(),
  });

  return schema.validate(post);
}

exports.Post = Post;
exports.validatePost = validatePost;
exports.postSchema = postSchema;
