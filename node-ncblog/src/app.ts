import dotenv from "dotenv";
import express from "express";
import "express-async-errors";
import http from "http";
import mongoose from "mongoose";
import { logEvents, } from "./middleware/logger.js";
import { connectToDb } from "./startup/db.js";
import routes from "./startup/routes.js";

dotenv.config()

const app = express()
routes(app);

const port = process.env.PORT || 5000;

process.env.NODE_ENV && console.log("Environment: ", process.env.NODE_ENV)
// console.log("Port: ", process.env.PORT);
// console.log("NODE_APP_MONGODB_URI: ", process.env.NODE_APP_MONGODB_URI);
// console.log("NODE_APP_JWT_ACCESS_SECRET: ", process.env.NODE_APP_JWT_ACCESS_SECRET);
// console.log("NODE_APP_JWT_REFRESH_SECRET: ", process.env.NODE_APP_JWT_REFRESH_SECRET);
// console.log("NODE_APP_SESSION_SECRET: ", process.env.NODE_APP_SESSION_SECRET);
// console.log("NODE_APP_FRONTEND_DOMAIN: ", process.env.NODE_APP_FRONTEND_DOMAIN);
// console.log("NODE_APP_ALLOWED_HOSTS: ", process.env.NODE_APP_ALLOWED_HOSTS);
// console.log("NODE_APP_DEFAULT_CATEGORY: ", process.env.NODE_APP_DEFAULT_CATEGORY);

connectToDb()

mongoose.connection.once('open', () => {
  console.log(`Connected to ${mongoose.connection.host}`);
  try {
    // console.log("Populating db")
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
  //reject(err);
});

// const __dirname = path.resolve();

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`App listening on port ${port}...`)
});

// const server = app.listen(port, () => {
//   console.log(`App listening on port ${port}...`)
// });
  
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

export default server;
// module.exports = server;