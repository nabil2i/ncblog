import express from "express";
import path from "path";

const router = express.Router();

router.get('^/$|/index(.html)?', (req, res) => {
  // res.send("Hello World");
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

export default router;
