const mongoose = require('mongoose');

module.exports = async function() {

  const db = process.env.MONGODB_URI;

  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(
      db,
      { useNewUrlParser: true, useUnifiedTopology: true });
      console.log(`Connected to ${conn.connection.host}`);
    
  } catch(err) {
    console.log(err);
  };
}
