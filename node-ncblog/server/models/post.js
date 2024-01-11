const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Joi = require('joi');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  body: {
    type: String,
    required: true,
    minlength: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  user: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    type: new mongoose.Schema({
      firstname: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      lastname: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
    }),
    required: true
  }
  },
  // {
  //   timestamps: true // auto createdAt and updatedAt 
  // },
);

// add a ticket field inside a post with collection Counter
postSchema.plugin(AutoIncrement, {
  inc_field: 'ticket',
  id: 'ticketNums',
  start_seq: 500
})

postSchema.statics.lookup = function(userId) {
  return this.findOne({
    'user._id': userId
  });
}

const Post = mongoose.model('Post', postSchema);

function validatePost(post) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    body: Joi.string().min(5).required(),
    userId: Joi.string().hex().length(24).required(),
    // userId: Joi.objectId().required(),
  });

  return schema.validate(post);
}

exports.Post = Post;
exports.validatePost = validatePost;
exports.postSchema = postSchema;
