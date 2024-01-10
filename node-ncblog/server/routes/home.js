const express = require('express');
const path = require('path');
const router = express.Router();

router.get('^/$|/index(.html)?', (req, res) => {
  // res.send("Hello World");
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

module.exports = router;
