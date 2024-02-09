import _ from "lodash";
import mongoose from "mongoose";
import Comment, { validateComment, validateUpdateComment } from "../models/comment.js";
import Post, { validatePost, validateUpdatePost } from "../models/post.js";
import User from "../models/user.js";
import { makeError } from "../utils/responses.js";
import cheerio from "cheerio";

// @desc Get all posts
// @route GET /posts
// @access Public
export const getAllPosts = async (req, res) => {
  res.status(200).json({ success: true, data: res.paginatedResults});
};

// @desc Create a post
// @route POST /posts
// @access Private Write
export const createNewPost = async (req, res, next) => {
  try {
    const { error } = validatePost(req.body);
    if (error) return next(makeError(400, error.details[0].message));

    // console.log(req.body);
    const { title, body, userId, img, category, tags } = req.body;

    const user = await User.findById(userId);
    if (!user) return next(makeError(400, "Invalid user"));
    
    const slug = cheerio.load(title).text().split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]+/g, '-');

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
    let postQuery;
    const postIdOrSlug = req.params.id;

    if (!postIdOrSlug) return next(makeError(400, "Post ID or slug is required"));
    
    const isObjectId = mongoose.Types.ObjectId.isValid(postIdOrSlug);

    if (isObjectId) {
      postQuery = { _id: postIdOrSlug };
    } else {
      postQuery = { slug: postIdOrSlug };
    }

    const post = await Post.findOne(postQuery)
      .populate([
        {
          path: 'user',
          select: 'firstname lastname',
        },
        // {
        //   path: 'comments',
        //   options: { sort: { createdAt: -1 } },
        //   populate: [
        //     {
        //       path: 'user',
        //       select: 'firstname lastname img',
        //     },
        //     {
        //       path: 'replies',
        //       options: { sort: { createdAt: -1 } },
        //       populate: {
        //         path: 'user',
        //         select: 'firstname lastname img'
        //       }
        //     }
        //   ]
        // }   
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
    
    // const calculateReplyCount = (comments) => {
    //   let replyCount = 0;

    //   for (const comment of comments) {
    //     replyCount += comment.replies.length;
    //     replyCount += calculateReplyCount(comment.replies);
    //   }
    //   return replyCount;
    // };

    // const commentCount = post.comments.length;
    // const replyCount = calculateReplyCount(post.comments);

    // const data = {
    //   ...post.toObject(),
    //   commentCount,
    //   replyCount,
    //   totalComments: commentCount + replyCount
    // }
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

    const { error } = validateUpdatePost(req.body);
    if (error) return next(makeError(400, error.details[0].message));
    
    const { title, body, userId, img, category, tags } = req.body;
    
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        title,
        body,
        userId, 
        img,
        category,
        tags
      },
      { new: true}
    );

    if (title) {
      const slug = title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
      post.slug = slug;
      await post.save();
    }
      
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

// @desc Update a post
// @route PUT /posts/:id
// @access Private
export const updateCurrentUserPost = async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.params.userId;
  if (!postId) return next(makeError(400, "Post ID required"));

  if (req.user._id !== userId) return next(makeError(403, "Operation not allowed"))

  try {
    const { error } = validateUpdatePost(req.body);
    if (error) return next(makeError(400, error.details[0].message));
    
    const { title, body, img, category, tags } = req.body;

    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $set: {
          title,
          body,
          category,
          img,
          tags
        }
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
// @route DELETE /posts/:id/:userId
// @access Private Writer
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
// @access Private Auth
export const getPostComments = async (req, res, next) => {
  let postQuery;
  const postIdOrSlug = req.params.id;

  if (!postIdOrSlug) return next(makeError(400, "Post ID or slug is required"));
  
  const isObjectId = mongoose.Types.ObjectId.isValid(postIdOrSlug);

  if (isObjectId) {
    postQuery = { _id: postIdOrSlug };
  } else {
    postQuery = { slug: postIdOrSlug };
  }

  // console.log(postQuery)

  const post = await Post.findOne(postQuery)
  .populate([
    {
      path: 'comments',
      options: { sort: { createdAt: -1 } },
      populate: [
        {
          path: 'user',
          select: 'username firstname lastname img',
        },
        {
          path: 'replies',
          options: { sort: { createdAt: 1 } },
          populate: {
            path: 'user',
            select: 'username firstname lastname img'
          }
        }
      ]
    }   
  ]).exec();
  // console.log(post)
  
  if (!post) return next(makeError(404, "Post not found"));

  const data = {
    comments: post.comments,
    numberOfComments: post.totalCommentsCount
  };

  // const comments = await Comment.find().sort("-createdAt");
  res.status(200).json({ success: true, message: "Comments of the post", data });
};

// @desc Create a comment
// @route POST /posts/:id/comments
// @access Private Auth
export const createComment = async (req, res, next) => {
  try {
    const { error } = validateComment(req.body);
    if (error) return next(makeError(400, error.details[0].message));

    // console.log(req.body);
    
    const postId = req.params.id;
    const { text, userId, parentCommentId, replyToComment } = req.body;

    const post = await Post.findById(postId);
    if (!post) return next(makeError(400, "Invalid post"));
    
    let newComment = new Comment({
      text,
      user: userId,
      post: postId,
    })

    if (replyToComment) {
      newComment.replyToComment  = replyToComment
    }
    
    if (parentCommentId) {
      const parentComment = await Comment.findById(parentCommentId);
      if (!parentComment)  return next(makeError(400, "Invalid parent comment ID"));
      
      parentComment.replies.push(newComment);
      // parentComment.numberOfReplies++;
      await parentComment.save();
      newComment.parentComment = parentCommentId
    } else {
      post.comments.push(newComment);
    }
    post.totalCommentsCount++;
    await post.save();
    newComment = await newComment.save();

    newComment = _.pick(newComment, ['_id', 'text']);
    res.status(201).json({success: true, data: newComment});
  } catch(err) {
    console.log(err)
    return next(makeError(500, "Internal Server Error"));
  }
};
// original createComment method
// @desc Create a comment
// // @route POST /posts/:id/comments
// // @access Private Auth
// export const createComment = async (req, res, next) => {
//   try {
//     const { error } = validateComment(req.body);
//     if (error) return next(makeError(400, error.details[0].message));

//     // console.log(req.body);
    
//     const postId = req.params.id;
//     const { text, userId, parentCommentId } = req.body;

//     const post = await Post.findById(postId);
//     if (!post) return next(makeError(400, "Invalid post"));
    
//     let newComment = new Comment({
//       text,
//       user: userId,
//       post: postId,
//     })
  
//     if (parentCommentId) {
//       newComment.parentComment = parentCommentId
//     }
    
//     newComment = await newComment.save();

//     if (parentCommentId) {
//       const parentComment = await Comment.findById(parentCommentId);
//       if (!parentComment)  return next(makeError(400, "Invalid parent comment ID"));

//       parentComment.replies.push(newComment);
//       await parentComment.save();
//     } else {
//       post.comments.push(newComment);
//     }
//     post.totalCommentsCount++;
//     await post.save();

//     newComment = _.pick(newComment, ['_id', 'text']);
//     res.status(201).json({success: true, data: newComment});
//   } catch(err) {
//     console.log(err)
//     return next(makeError(500, "Internal Server Error"));
//   }
// };

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
// @access Private Admin
export const updateComment = async (req, res, next) => {
  const commentId = req.params.cid;

  if (!commentId) return next(makeError(400, "Comment ID required"));

  const { error } = validateUpdateComment(req.body);
    if (error) return next(makeError(400, error.details[0].message));
    
    const { text, userId, parentCommentId } = req.body;

    const comment = await Comment.findByIdAndUpdate(
      commentId,
      {
        text, userId, parentCommentId
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
// @route UPDATE /posts/:id/comments/:cid/:uid
// @access Private
export const updateUserComment = async (req, res, next) => {
  const commentId = req.params.cid;

  const commentOwnerId = req.params.uid
  const writerId = req.user._id
  // console.log("writer", writerId)
  // console.log("commentowner", commentOwnerId)
  // console.log(req.user.isAdmin)

  if (!(req.user.isAdmin || writerId === commentOwnerId))
    return next(makeError(401, "You are not authorized to make this request"));

  if (!commentId) return next(makeError(400, "Comment ID required"));

  const { error } = validateUpdateComment(req.body);
    if (error) return next(makeError(400, error.details[0].message));
    
    const { text, userId, parentCommentId } = req.body;

    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { $set: { text } },
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
// @access Private Admin
export const deleteComment = async (req, res, next) => {
  const commentId = req.params.cid;

  if (!commentId) return next(makeError(400, "Comment ID required"));

  try {
    const comment = await Comment.findById(commentId);
    
    if(!comment) return next(makeError(404, "The comment with given ID is not found"));
    // console.log(comment, "deleting replies")
    
    const parentPost = await Post.findById(comment.post);

    await deleteReplies(comment.replies, parentPost);

    if (comment.parentComment) {
      const parentComment = await Comment.findById(comment.parentComment);
      if (parentComment) {
        parentComment.replies = parentComment.replies.filter(replyId => (
          replyId.toString() !== commentId)
        )
        await parentComment.save();
      }
    } else {
        parentPost.comments = parentPost.comments.filter(postCommentId => (
          postCommentId.toString() !== commentId)
        );
        // await parentPost.save(); 
      }
       
      await Comment.findByIdAndDelete(commentId);

      parentPost.totalCommentsCount -= 1;
      await parentPost.save(); 

    res.status(200).json({
      success: true,
      message: "Comment and replies deleted"
    });
  } catch (error) {
    return next(makeError(500, "Internal server error"));
  }
};

// @desc Create a comment
// @route DELETE /posts/:id/comments/:cid/!uid
// @access Private User
export const deleteUserComment = async (req, res, next) => {
  const commentId = req.params.cid;
  const commentOwnerId = req.params.uid

  if (!(req.user.isAdmin || req.user._id === commentOwnerId))
    return next(makeError(401, "You are not authorized to make this request"));

  if (!commentId) return next(makeError(400, "Comment ID required"));

  try {
    const comment = await Comment.findById(commentId);
    
    if(!comment) return next(makeError(404, "The comment with given ID is not found"));
    // console.log(comment, "deleting replies")
    
    const parentPost = await Post.findById(comment.post);

    await deleteReplies(comment.replies, parentPost);

    if (comment.parentComment) {
      const parentComment = await Comment.findById(comment.parentComment);
      if (parentComment) {
        parentComment.replies = parentComment.replies.filter(replyId => (
          replyId.toString() !== commentId)
        )
        await parentComment.save();
      }
    } else {
        parentPost.comments = parentPost.comments.filter(postCommentId => (
          postCommentId.toString() !== commentId)
        );
        // await parentPost.save(); 
      }
       
      await Comment.findByIdAndDelete(commentId);

      parentPost.totalCommentsCount -= 1;
      await parentPost.save(); 

    res.status(200).json({
      success: true,
      message: "Comment and replies deleted"
    });
  } catch (error) {
    return next(makeError(500, "Internal server error"));
  }
};


const deleteReplies = async (replyIds, parentPost) => {
  if (!replyIds || replyIds.length === 0) return;

  // Delete each reply
  for (const replyId of replyIds) {
    const replyToDelete = await Comment.findById(replyId);
    if (replyToDelete) {
      await deleteReplies(replyToDelete.replies, parentPost);
      
      // Remove the reply from its parent comment's replies
      if (replyToDelete.parentComment) {
        const parentComment = await Comment.findById(replyToDelete.parentComment);
        if (parentComment) {
          parentComment.replies = parentComment.replies.filter(replyId => (
            replyId.toString() !== replyToDelete._id.toString())
            );
            await parentComment.save();
          }
        }
        // await parentPost.save();
        // Delete the reply
        await Comment.findByIdAndDelete(replyId);
        parentPost.totalCommentsCount -= 1;
    }
  }
};


// export const getCommentsForPost = async (postId) => {
//   // Fetch comments for the post with hierarchical structure
//   const comments = await Comment.find({ post: postId })
//     .sort({ createdAt: -1 }) // Sort in ascending order by creation date
//     .populate('user') // Populate user data as needed
//     .populate('replies.user') // Populate user data for reply comments

//   // Organize comments in a hierarchical structure
//   const commentMap = new Map();
//   const topLevelComments = [];

//   comments.forEach((comment) => {
//     const parentId = comment.parentComment;

//     if (!parentId) {
//       // Top-level comment
//       topLevelComments.push(comment);
//     } else {
//       // Reply comment
//       const parentComment = commentMap.get(parentId);
//       if (parentComment) {
//         if (!parentComment.replies) {
//           parentComment.replies = [];
//         }
//         parentComment.replies.push(comment);
//       }
//     }

//     // Store the comment in the map for future reference
//     commentMap.set(comment._id, comment);
//   });

//   // Flatten the comments into a single array with the desired order
//   const flattenedComments = [];

//   const flattenComment = (comment) => {
//     flattenedComments.push(comment);
//     if (comment.replies) {
//       comment.replies.forEach((reply) => {
//         flattenComment(reply);
//       });
//     }
//   };

//   topLevelComments.forEach((comment) => {
//     flattenComment(comment);
//   });

//   return flattenedComments;
// };
