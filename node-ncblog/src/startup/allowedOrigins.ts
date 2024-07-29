import dotenv from "dotenv";

dotenv.config();

const allowedOrigins = process.env.NODE_APP_ALLOWED_HOSTS
  ? process.env.NODE_APP_ALLOWED_HOSTS.split(',')
  : [];

  export default allowedOrigins
// module.exports = allowedOrigins
