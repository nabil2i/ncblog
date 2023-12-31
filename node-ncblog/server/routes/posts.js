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

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // console.log(req.body);

  // get the user who is posting
  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send('Invalid user.');

  let newPost = new Post({
    user: {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      title: req.body.title,
      body: req.body.body
    }
  })
  newPost = await newPost.save();
  // const newPost = new Post({
  //   title: req.body.title,
  //   body: req.body.body
  // });

  // await Post.create(newPost);

  res.send(newPost);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const post = await Post.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      body: req.body.body,
    },
    { new: true}
  );

  if (!post) return res.status(404).send("The post with given ID doesn't exist");

  res.send(post);
});

router.delete('/:id', async (req, res) => {
  const post = await Post.findByIdAndRemove(req.params.id);

  if(!post) return res.status(404).send('The post with given ID is not found.')

  res.send(post);
})

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
