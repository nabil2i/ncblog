const express = require('express');
const {Post, validate } = require('../models/post');
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

  
// INSERTING DUMMY POSTS
// function insertPostData () {
//   Post.insertMany([
//     {
//       title: "Building APIs with Node.js",
//       body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
//     },
//     {
//       title: "Deployment of Node.js applications",
//       body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
//     },
//     {
//       title: "Authentication and Authorization in Node.js",
//       body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
//     },
//     {
//       title: "Understand how to work with MongoDB and Mongoose",
//       body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
//     },
//     {
//       title: "Build real-time, event-driven applications in Node.js",
//       body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
//     },
//     {
//       title: "Discover how to use Express.js",
//       body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
//     },
//     {
//       title: "Asynchronous Programming with Node.js",
//       body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
//     },
//     {
//       title: "Learn the basics of Node.js and its architecture",
//       body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
//     },
//     {
//       title: "NodeJs Limiting Network Traffic",
//       body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
//     },
//     {
//       title: "Learn Morgan - HTTP Request logger for NodeJs",
//       body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
//     },
//   ]);
//   console.log("Added posts");
// }

// insertPostData();

module.exports = router;
