const mongoose = require('mongoose');
const { Post } = require('../models/post')

// module.exports = async function() {

const connectDb = async () => {
  const dbUrl = process.env.NODE_APP_MONGODB_URI;

  try {
    mongoose.set('strictQuery', false);
    const conn = mongoose.connect(
      dbUrl,
      // { useNewUrlParser: true, useUnifiedTopology: true }
    );
    // console.log(`Connected to ${conn.connection.host}`);

    // const dbCon = mongoose.connection;
    // console.log(dbCon);
    // populate db if not
    // dbCon.once('open', populateDb)
  } catch(err) {
    console.log(err);
  }
}

const populateDb = async () => {
    if (await Post.countDocuments().exec() > 0) return;
    // Promise.all([
    //   Post.insert({
    //     title: "Building APIs with Node.js",
    //     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
    //   }),
    //   Post.insert({
    //     title: "Deployment of Node.js applications",
    //     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
    //   }),
    //   Post.insert({
    //     title: "Authentication and Authorization in Node.js",
    //     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
    //   }),
    //   Post.insert({
    //     title: "Understand how to work with MongoDB and Mongoose",
    //     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
    //   }),
    //   Post.insert({
    //     title: "Build real-time, event-driven applications in Node.js",
    //     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
    //   }),
    //   Post.insert({
    //     title: "Discover how to use Express.js",
    //     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
    //   }),
    //   Post.insert({
    //     title: "Asynchronous Programming with Node.js",
    //     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
    //   }),
    //   Post.insert({
    //     title: "Learn the basics of Node.js and its architecture",
    //     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
    //   }),
    //   Post.insert({
    //     title: "NodeJs Limiting Network Traffic",
    //     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
    //   }),
    //   Post.insert({
    //     title: "Learn Morgan - HTTP Request logger for NodeJs",
    //     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
    //   }),
    // ]).then(() => console.log("Added Posts"))

    Promise.resolve(
      Post.insertMany([
      {
        title: "Building APIs with Node.js",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
      },
      {
        title: "Deployment of Node.js applications",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
      },
      {
        title: "Authentication and Authorization in Node.js",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
      },
      {
        title: "Understand how to work with MongoDB and Mongoose",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
      },
      {
        title: "Build real-time, event-driven applications in Node.js",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
      },
      {
        title: "Discover how to use Express.js",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
      },
      {
        title: "Asynchronous Programming with Node.js",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
      },
      {
        title: "Learn the basics of Node.js and its architecture",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
      },
      {
        title: "NodeJs Limiting Network Traffic",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
      },
      {
        title: "Learn Morgan - HTTP Request logger for NodeJs",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel fuga deleniti. Aspernatur qui pariatur cumque sequi, eaque ut molestias voluptate! Labore, quo velit reiciendis, eius nostrum eligendi explicabo fugit rem officia blanditiis ab dignissimos modi minima eveniet sit tempora! Eius quod libero omnis. Pariatur officiis neque iste voluptatum qui eius rem consectetur esse. Nihil porro dolores minus officia fugiat."
      }
    ])).then(() => console.log("Added posts"));
}

module.exports = { connectDb, populateDb }