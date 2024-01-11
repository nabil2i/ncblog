const asyncHandler = require('express-async-handler') // to avoid writing try/catch 
const _ = require('lodash');
const Joi = require('joi');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { User, validateUser } = require('../models/user');
const { Post, validatePost } = require('../models/post');
const paginate = require('../middleware/paginate');


// @desc Get all posts
// @route GET /posts
// @access Public
const getAllPosts = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: res.paginatedResults});
});

// @desc Create a post
// @route POST /posts
// @access Private
const createNewPost = async (req, res) => {
  try {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).json({ success: false, error: { code: 400, message: error.details[0].message}});
    // console.log(req.body);
    
    // get the user who is posting
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).json({ success: false, error: { code: 400, message: 'Invalid user.'}});
    
    let newPost = new Post({
      user: {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
      },
      title: req.body.title,
      body: req.body.body
    })
    newPost = await newPost.save();
    // await Post.create(newPost);

    if (!newPost) return res.status(400).json({ success: false, error: { code: 400, message: 'An error occured' } });

    newPost = _.pick(newPost, ['_id', 'title', 'user._id', 'user.firstname', 'user.lastname']);
    res.status(201).json({success: true, data: newPost});
  } catch(err) {
    console.log(err)
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, error: { code: 400, message: 'Invalid post ID.' } });
    }
    res.status(500).json({ success: false, error: { code: 500, message: err.errors} });
  }
};

// @desc Get a post
// @route GET /posts/:id
// @access Public
const getPost = async (req, res) => {
  try {

    if (!req.params.id) {
      return res.status(400).json({ success: false, error: { code: 400, message: "Post ID required."}})
    }
    
    let id = req.params.id;
    
    const post = await Post.findById({ _id: id}).lean().exec();
    
    if (!post) return res.status(404).json({
      success: false, 
      error: {
        code: 404,
        message: 'The post with the given ID was not found.'
      }
    });
    
    res.status(200).json({ success: true, data: post});
  } catch(err) {
    console.log(err)
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, error: { code: 400, message: 'Invalid post ID.' } });
    }
    res.status(500).json({ success: false, error: { code: 500, message: 'Internal Server Error.' } });
  }
};

// @desc Update a post
// @route PUT /posts/:id
// @access Private
const updatePost = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ success: false, error: { code: 400, message: "Post ID required."}})
    }

    const { error } = validatePost(req.body);
    if (error) return res.status(400).json({ success: false, error: { code: 400, message: error.details[0].message}});
    
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        body: req.body.body,
      },
      { new: true}
      );
      
      if (!post) return res.status(404).json({ success: false, error: { code: 404, message: "The post with given ID doesn't exist"}});
      
      res.json({ success: true, message: `The post with ID ${post._id} is updated`});
    } catch(err) {
      console.log(err)
      if (err.name === 'CastError') {
        return res.status(400).json({ success: false, error: { code: 400, message: 'Invalid post ID.' } });
      }
      res.status(500).json({ success: false, error: { code: 500, message: 'Internal Server Error.' } });
    }
};

// @desc Delete a post
// @route DELETE /posts/:id
// @access Private
const deletePost = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ success: false, error: { code: 400, message: "Post ID required."}})
    }
  
    const post = await Post.findByIdAndRemove(req.params.id);
  
    if(!post) return res.status(404).json({ success: false, error: { code: 404, message: 'The post with given ID is not found.'}})
  
    res.status(200).json({ success: true, message: `The post with ID ${post._id} was deleted.`});

  } catch(err) {
    console.log(err)
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, error: { code: 400, message: 'Invalid post ID.' } });
    }
    res.status(500).json({ success: false, error: { code: 500, message: 'Internal Server Error.' } });
  }
};

module.exports = {
  getAllPosts,
  getPost,
  createNewPost,
  updatePost,
  deletePost
}
