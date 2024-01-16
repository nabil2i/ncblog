const asyncHandler = require('express-async-handler') // to avoid writing try/catch 
const _ = require('lodash');
const Joi = require('joi');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { User, validateUser } = require('../models/user');
const { Post, validatePost } = require('../models/post');
const { Comment, validateComment } = require('../models/comment');
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
    if (error)
      return res.status(400).json({
        success: false,
        error: { code: 400, message: error.details[0].message}
      });
    // console.log(req.body);
    const { title, body, userId } = req.body;

    const user = await User.findById(userId);
    if (!user)
      return res.status(400).json({
        success: false,
        error: { code: 400, message: 'Invalid user'}
      });
    
    let newPost = new Post({
      user: userId,
      title,
      body
    })
    // let newPost = new Post({
    //   user: {
    //     _id: user._id,
    //     firstname: user.firstname,
    //     lastname: user.lastname,
    //   },
    //   title,
    //   body
    // })
    newPost = await newPost.save();

    if (!newPost)
      return res.status(400).json({
        success: false,
        error: { code: 400, message: 'An error occured' }
      });

    newPost = _.pick(newPost, ['_id', 'title', 'user']);
    res.status(201).json({success: true, data: newPost});
  } catch(err) {
    console.log(err)
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: 'Invalid post ID' }
      });
    }
    res.status(500).json({
      success: false,
      error: { code: 500, message: err.errors}
    });
  }
};

// @desc Get a post
// @route GET /posts/:id
// @access Public
const getPost = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: "Post ID required"}
      })
    }
     
    const post = await Post.findById(postId)
      .populate([
        {
          path: 'user',
          select: 'firstname lastname',
        },
        {
          path: 'comments',
          populate: [
            {
              path: 'user',
              select: 'firstname lastname',
            },
            {
              path: 'replies',
              populate: {
                path: 'user',
                select: 'firstname lastname'
              }
            }
          ]
        }   
      ])
      // .populate({
      //   path: 'user',
      //   select: 'firstname lastname',
      // })
      // .populate({
      //   path: 'comments',
      //   populate: [
      //     {
      //       path: 'user',
      //       select: 'firstname lastname',
      //     },
      //     {
      //       path: 'replies',
      //       populate: {
      //         path: 'user',
      //         select: 'firstname lastname'
      //       }
      //     }
      //   ]
      // })
      .exec();
    
    if (!post) return res.status(404).json({
      success: false, 
      error: {
        code: 404,
        message: 'The post with the given ID was not found'
      }
    });
    
    res.status(200).json({ success: true, data: post});
  } catch(err) {
    console.log(err)
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: 'Invalid post ID'}
      });
    }
    res.status(500).json({
      success: false,
      error: { code: 500, message: 'Internal Server Error'}
    });
  }
};

// @desc Update a post
// @route PUT /posts/:id
// @access Private
const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: "Post ID required"}
      });
    }

    const { error } = validatePost(req.body);
    if (error) return res.status(400).json({
      success: false,
      error: { code: 400, message: error.details[0].message}
    });
    
    const { title, body, userId } = req.body;

    const post = await Post.findByIdAndUpdate(
      postId,
      {
        title,
        body,
      },
      { new: true}
    );
      
    if (!post) return res.status(404).json({
      success: false,
      error: { code: 404, message: "The post with given ID doesn't exist"}
    });
      
    res.json({ success: true, message: `The post with ID ${post._id} is updated`});
  } catch(err) {
    console.log(err)
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: 'Invalid post ID'}
      });
    }
    res.status(500).json({
      success: false,
      error: { code: 500, message: 'Internal Server Error'}
    });
  }
};

// @desc Delete a post
// @route DELETE /posts/:id
// @access Private
const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: "Post ID required"}
      })
    }
  
    const post = await Post.findByIdAndRemove(postId);
  
    if(!post) return res.status(404).json({
      success: false,
      error: { code: 404, message: 'The post with given ID is not found'}
    })
  
    res.status(200).json({
      success: true,
      message: `The post with ID ${post._id} was deleted`
    });

  } catch(err) {
    console.log(err)
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: { code: 400, message: 'Invalid post ID'}
      });
    }
    res.status(500).json({
      success: false,
      error: { code: 500, message: 'Internal Server Error'}
    });
  }
};

// RELETED TO COMMENTS OF A POST
// @desc Get all posts
// @route GET /posts/:id/comments
// @access Private
const getPostComments = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const comments = await Comment.find().sort("-createdAt");
  res.status(200).json({ success: true, message: "Get all comments of the post" });
});

// @desc Create a comment
// @route POST /posts/:id/comments
// @access Private
const createComment = async (req, res) => {
  try {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).json({
      success: false,
      error: { code: 400, message: error.details[0].message}
    });
    // console.log(req.body);
    
    const postId = req.params.id;
    const { text, userId, parentCommentId } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(400).json({
      success: false,
      error: { code: 400, message: 'Invalid post'}
    });
    
    let newComment = new Comment({
      text,
      user: userId,
      post: postId
    })

    newComment = await newComment.save();

    if (parentCommentId) {
      const parentComment = await Comment.findById(parentCommentId);
      if (!parentComment) {
        return res.status(400).json({
          success: false,
          error: { code: 400, message: 'Invalid parent comment ID'}
        });
      }

      parentComment.replies.push(newComment);
      await parentComment.save();
    } else {
      post.comments.push(newComment);
      await post.save();
    }

    newComment = _.pick(newComment, ['_id', 'text']);
    res.status(201).json({success: true, data: newComment});
  } catch(err) {
    console.log(err)
    // if (err.name === 'CastError') {
    //   return res.status(400).json({
    //     success: false,
    //     error: { code: 400, message: 'Invalid post ID'}
    //   });
    // }
    res.status(500).json({
      success: false,
      error: { code: 500, message: err.errors}
    });
  }
};

// @desc Create a comment
// @route GET /posts/:id/comments/:cid
// @access Private
const getComment = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get a comment of a post" });
});

// @desc Create a comment
// @route UPDATE /posts/:id/comments/:cid
// @access Private
const updateComment = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Update a comment of a post"
  });
});

// @desc Create a comment
// @route DELETE /posts/:id/comments/:cid
// @access Private
const deleteComment = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Delete a comment of a post"
  });
});


module.exports = {
  getAllPosts,
  getPost,
  createNewPost,
  updatePost,
  deletePost,
  getPostComments,
  createComment,
  getComment,
  updateComment,
  deleteComment
}
