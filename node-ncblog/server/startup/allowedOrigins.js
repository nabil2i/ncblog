const allowedOrigins = process.env.NODE_APP_ALLOWED_HOSTS
  ? process.env.NODE_APP_ALLOWED_HOSTS.split(',')
  : [];

module.exports = allowedOrigins
