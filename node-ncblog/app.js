import dotenv from "dotenv";
import "express-async-errors";
import mongoose from "mongoose";
import express from "express";
import { logEvents } from "./server/middleware/logger.js"
import routes from "./server/startup/routes.js" 
import { connectToDb } from"./server/startup/db.js";


dotenv.config()

const app = express()
routes(app);

const port = process.env.PORT || 5000;

process.env.NODE_ENV && console.log("Environment: ", process.env.NODE_ENV)
// console.log("Front end domain: ", process.env.NODE_APP_FRONTEND_DOMAIN)


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
  reject(err);
});

// const __dirname = path.resolve();


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

export default server;
// module.exports = server;