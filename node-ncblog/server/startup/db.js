const mongoose = require('mongoose');
const { Post } = require('../models/post')


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

module.exports = { connectDb }
