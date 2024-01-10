const express = require('express');
const path = require('path');
const router = express.Router();

router.get('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, '..', 'views', '404.html'));
  } else if (req.accepts('json')) {
      res.json({ message: '404 Not Found'})
  } else {
    res.type('text').send('404 Not Found')
  }
});

module.exports = router;
