const express = require('express');
const { Post } = require('../models/post');
const router = express.Router();
const paginate = require('../middleware/paginate');
const postsController = require('../controllers/postsController');
const editor = require('../middleware/editor');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.route('/')
  // get all blog posts
  .get(paginate(Post), postsController.getAllPosts)
  // create a blog post
  .post([auth, editor], postsController.createNewPost);

router.route('/:id')
  // get a blog post
  .get(postsController.getPost)
  // update a blog post
  .put([auth, editor], postsController.updatePost)
  // delete a blog post
  .delete([auth, editor], postsController.deletePost);

router.route('/:id/comments')
  // get all comments of a blog post
  // .get([auth, admin], paginate(Comment), postsController.getPostComments)
  // create a comment on a blog post
  .post(auth, postsController.createComment)

router.route('/:id/comments/:cid')
  // get a comment of a blog post
  .get([auth, admin], postsController.getComment)
  // update a comment of a blog post
  .put([auth, admin], postsController.updateComment)
  // delete a comment of a blog post
  .delete([auth, admin], postsController.deleteComment);


module.exports = router;
