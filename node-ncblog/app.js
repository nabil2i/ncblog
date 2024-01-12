require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const { logEvents } = require('./server/middleware/logger')

const app = express();

require('./server/startup/routes')(app);
// require('./server/startup/db')();
const { connectDb, populateDb } = require('./server/startup/db');

const port = process.env.PORT || 5000;

console.log("Environment: ", process.env.NODE_ENV)

connectDb()

mongoose.connection.once('open', () => {
  console.log(`Connected to ${mongoose.connection.host}`);
  try {
    console.log("Populating db")
    // populateDb();
  } catch(error) {
    console.log(error)
  }
  // const serverIstance = app.listen(port, () => {
  //   console.log(`App listening on port ${port}...`)                                                                                                                                                                                    
  //   resolve(serverIstance)
  // });
});

mongoose.connection.on('error', (err) => {
  console.log(err);
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
  reject(err);
});

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}...`)
});
  
// console.log("server: ", server)


// const startServer = async () => {
//   await connectDb();
//   return new Promise((resolve, reject) => {
//     mongoose.connection.once('open', () => {
//       console.log(`Connected to ${mongoose.connection.host}`);
//       try {
//         populateDb();
//       } catch(error) {
//         console.log(error)
//       }
//       const serverIstance = app.listen(port, () => {
//         console.log(`App listening on port ${port}...`)
//         resolve(serverIstance)
//       });
//     });

//     mongoose.connection.on('error', (err) => {
//       console.log(err);
//       logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
//       reject(err);
//     });
//   });
// }

// startServer()
//   .then((server) => {
//     console.log('Server started:', server);
//   })
//   .catch((error) => {
//     console.error('Error starting server:', error);
//   });

  
module.exports = server;