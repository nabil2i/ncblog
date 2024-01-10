require('dotenv').config();

const express = require('express');

const app = express();

require('./server/startup/routes')(app);
require('./server/startup/db')();

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App listening on port ${port}...`)
});

module.exports = server;
