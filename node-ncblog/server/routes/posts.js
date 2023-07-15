const express = require('express');
const {Post, validate } = require('../models/post');
const router = express.Router();
const paginate = require('../middleware/paginate');

// ROUTES
// GET all blog posts
router.get('/', paginate(Post), async (req, res) => {
  res.send(res.paginatedResults);
  // const locals = {
  //   title: "NabilConveys Blog",
  //   description: "Conveying the message of God to all humanity!" 
  // };

  // try {

  //   let page = parseInt(req.query.page) || 1;
  //   let perPage = parseInt(req.query.perPage) || 3;
  //   let searchTerm = req.query.search;
  //   let count = 0;
  //   let prevPage = null;
  //   let nextPage = null;
  //   let hasNextPage = false;
  //   let results = [];
  //   let data = {};

  //   if (searchTerm) {
  //     const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
  //     // console.log(searchTerm)

  //     results = await Post
  //       .find({ 
  //         // do query 
  //         $or: [
  //           { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
  //           { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
  //         ]
  //       })
  //       .sort("-createdAt");

  //       count = await Post
  //       .find({ 
  //         // do query 
  //         $or: [
  //           { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
  //           { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
  //         ]
  //       })
  //       .count();

  //     data = {
  //       locals,
  //       count,
  //       current: page,
  //       prev: prevPage,
  //       next: nextPage,
  //       results
  //     }
  //   }
  //   else {
  //     // pagination
  //     count = await Post.count();
  //     perPage = 3

  //     const results = await Post
  //       .aggregate([{ $sort: { createdAt: -1 }}])
  //       .skip(perPage * page - perPage)
  //       .limit(perPage)
  //       .exec();
  //     // posts = await Post.find().sort("-createdAt");

  //     prevPage = page >= 2 ? parseInt(page) - 1 : null;
  //     nextPage = parseInt(page) + 1;
  //     hasNextPage = nextPage <= Math.ceil(count / perPage);

  //     data = {
  //       locals,
  //       count,
  //       current: page,
  //       prev: prevPage,
  //       next: hasNextPage ? nextPage : null,
  //       perPage: perPage,
  //       results
  //     }
  //   }

  //   res.send(data);
  // } catch(err) {
  //   console.log(err);
  // }

  // res.send("Hello World");
});

router.get('/:id', async(req, res) => {
  try {
    let id = req.params.id;
    const post = await Post.findById({ _id: id});
    res.send(post);
  } catch(err) {
    console.log(err)
  }
});

// INSERTING DUMMY POSTS
// function insertPostData () {
//   Post.insertMany([
//     {
//       title: "Building APIs with Node.js",
//       body: "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js"
//     },
//     {
//       title: "Deployment of Node.js applications",
//       body: "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments..."
//     },
//     {
//       title: "Authentication and Authorization in Node.js",
//       body: "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries."
//     },
//     {
//       title: "Understand how to work with MongoDB and Mongoose",
//       body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications."
//     },
//     {
//       title: "build real-time, event-driven applications in Node.js",
//       body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js."
//     },
//     {
//       title: "Discover how to use Express.js",
//       body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications."
//     },
//     {
//       title: "Asynchronous Programming with Node.js",
//       body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations."
//     },
//     {
//       title: "Learn the basics of Node.js and its architecture",
//       body: "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers."
//     },
//     {
//       title: "NodeJs Limiting Network Traffic",
//       body: "Learn how to limit netowrk traffic."
//     },
//     {
//       title: "Learn Morgan - HTTP Request logger for NodeJs",
//       body: "Learn Morgan."
//     },
//   ])
// }

// insertPostData();

module.exports = router;
