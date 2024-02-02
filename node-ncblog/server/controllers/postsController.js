import _ from "lodash";
import Comment, { validateComment } from "../models/comment.js";
import Post, { validatePost } from "../models/post.js";
import User from "../models/user.js";
import { makeError } from "../utils/responses.js";


// @desc Get all posts
// @route GET /posts
// @access Public
export const getAllPosts = async (req, res) => {
  res.status(200).json({ success: true, data: res.paginatedResults});
};

// @desc Create a post
// @route POST /posts
// @access Private
export const createNewPost = async (req, res, next) => {
  try {
    const { error } = validatePost(req.body);
    if (error) return next(makeError(400, error.details[0].message));

    // console.log(req.body);
    const { title, body, userId, img, category, tags } = req.body;

    const user = await User.findById(userId);
    if (!user) return next(makeError(400, "Invalid user"));
    
    const slug = title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');

    let newPost = new Post({
      slug,
      user: userId,
      title,
      body,
      img,
      category,
      tags
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

    if (!newPost) return next(makeError(400, "An error occured"));

    newPost = _.pick(newPost, ['_id', 'title', 'user']);
    res.status(201).json({success: true, data: newPost});
  } catch(err) {
    console.log(err)
    if (err.name === 'CastError') {
      return next(makeError(400, "Invalid post ID"));
    }
    return next(makeError(500, "Internal Server Error"));
  }
};

// @desc Get a post
// @route GET /posts/:id
// @access Public
export const getPost = async (req, res, next) => {
  try {
    const postId = req.params.id;

    if (!postId) return next(makeError(400, "Post ID required"));
     
    const post = await Post.findById(postId)
      .populate([
        {
          path: 'user',
          select: 'firstname lastname',
        },
        {
          path: 'comments',
          options: { sort: { createdAt: -1 } },
          populate: [
            {
              path: 'user',
              select: 'firstname lastname',
            },
            {
              path: 'replies',
              options: { sort: { createdAt: -1 } },
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
    
    if (!post) return next(makeError(404, "The post with the given ID was not found"));
    
    res.status(200).json({ success: true, data: post});
  } catch(err) {
    console.log(err)
    if (err.name === 'CastError') {
      return next(makeError(400, "Invalid post ID"));
    }
    return next(makeError(500, "Internal Server Error"));
  }
};

// @desc Update a post
// @route PUT /posts/:id
// @access Private
export const updatePost = async (req, res, next) => {
  try {
    const postId = req.params.id;

    if (!postId) return next(makeError(400, "Post ID required"));

    const { error } = validatePost(req.body);
    if (error) return next(makeError(400, error.details[0].message));
    
    const { title, body, userId } = req.body;

    const post = await Post.findByIdAndUpdate(
      postId,
      {
        title,
        body,
      },
      { new: true}
    );
      
    if (!post) return next(makeError(404, "The post with given ID doesn't exist"));
      
    res.json({ success: true, message: `The post with ID ${post._id} is updated`});
  } catch(err) {
    console.log(err)
    if (err.name === 'CastError') {
      return next(makeError(400, "Invalid post ID"));
    }
    return next(makeError(500, "Internal Server Error"));
  }
};

// @desc Delete a post
// @route DELETE /posts/:id
// @access Private Admin
export const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;

    if (!postId) return next(makeError(400, "Post ID required"));
  
    const post = await Post.findByIdAndDelete(postId);
  
    if(!post) return next(makeError(404, "The post with given ID is not found"));
  
    res.status(200).json({
      success: true,
      message: `The post with ID ${post._id} was deleted`,
      data: {
        id: postId
      }
    });

  } catch(err) {
    console.log(err)
    if (err.name === 'CastError') {
      return next(makeError(400, "Invalid post ID"));
    }
    return next(makeError(500, "Internal Server Error"));
  }
};

// @desc Delete a post
// @route DELETE /posts/:id/:userId
// @access Private Editor
export const deleteCurrentUserPost = async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.params.userId;
  if (!postId) return next(makeError(400, "Post ID required"));

  if (req.user._id !== userId) return next(makeError(403, "Operation not allowed"))
  try {
    const post = await Post.findByIdAndDelete(postId);
  
    if(!post) return next(makeError(404, "The post with given ID is not found"));
  
    res.status(200).json({
      success: true,
      message: `The post with ID ${post._id} was deleted`,
      data: {
        id: postId
      }
    });

  } catch(err) {
    console.log(err)
    if (err.name === 'CastError') {
      return next(makeError(400, "Invalid post ID"));
    }
    return next(makeError(500, "Internal Server Error"));
  }
};

// RELETED TO COMMENTS OF A POST
// @desc Get all posts
// @route GET /posts/:id/comments
// @access Private
export const getPostComments = async (req, res) => {
  const postId = req.params.id;
  const comments = await Comment.find().sort("-createdAt");
  res.status(200).json({ success: true, message: "Get all comments of the post" });
};

// @desc Create a comment
// @route POST /posts/:id/comments
// @access Private
export const createComment = async (req, res, next) => {
  try {
    const { error } = validateComment(req.body);
    if (error) return next(makeError(400, error.details[0].message));

    // console.log(req.body);
    
    const postId = req.params.id;
    const { text, userId, parentCommentId } = req.body;

    const post = await Post.findById(postId);
    if (!post) return next(makeError(400, "Invalid post"));
    
    let newComment = new Comment({
      text,
      user: userId,
      post: postId,
      parent: parentCommentId
    })

    newComment = await newComment.save();

    if (parentCommentId) {
      const parentComment = await Comment.findById(parentCommentId);
      if (!parentComment)  return next(makeError(400, "Invalid parent comment ID"));

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
    return next(makeError(500, "Internal Server Error"));
  }
};

// @desc Create a comment
// @route GET /posts/:id/comments/:cid
// @access Private
export const getComment = async (req, res, next) => {
  const commentId = req.params.cid;

  if (!commentId) return next(makeError(400, "Comment ID required"));

  const comment = await Comment.findById(commentId);

  res.status(200).json({
    success: true,
    message: "Get a comment of a post",
    data: comment
  });
};

// @desc Create a comment
// @route UPDATE /posts/:id/comments/:cid
// @access Private
export const updateComment = async (req, res, next) => {
  const commentId = req.params.cid;

  if (!commentId) return next(makeError(400, "Comment ID required"));

  const { error } = validateComment(req.body);
    if (error) return next(makeError(400, error.details[0].message));
    
    const { text, userId } = req.body;

    const comment = await Comment.findByIdAndUpdate(
      commentId,
      {
        text, userId
      },
      { new: true}
    );
      
    if (!comment) return next(makeError(404, "The comment with given ID doesn't exist"));
      
    res.json({
      success: true,
      message: `The comment with ID ${comment._id} is updated`
    });
};

// @desc Create a comment
// @route DELETE /posts/:id/comments/:cid
// @access Private
export const deleteComment = async (req, res, next) => {
  const commentId = req.params.cid;

  if (!commentId) return next(makeError(400, "Comment ID required"));

  const comment = await Comment.findById(commentId);

  if(!comment) return next(makeError(404, "The comment with given ID is not found"));

  await deleteReplies(comment.replies);

  res.status(200).json({
    success: true,
    message: "Comment and replies deleted"
  });
};


const deleteReplies = async (replyIds) => {
  if (!replyIds || replyIds.length === 0) return;

  // Delete each reply
  for (const replyId of replyIds) {
    const replyToDelete = await Comment.findById(replyId);
    if (replyToDelete) {
      await deleteReplies(replyToDelete.replies);

      await Comment.findByIdAndRemove(replyId);
    }
  }
};
