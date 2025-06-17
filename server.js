
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const CommentSchema = new mongoose.Schema({
  name: String,
  comment: String,
});

const Comment = mongoose.model('Comment', CommentSchema);

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// GET all comments
app.get('/comments', async (req, res) => {
  const comments = await Comment.find();
  res.json(comments);
});

// POST a comment
app.post('/comments', async (req, res) => {
  const { name, comment } = req.body;
  const newComment = new Comment({ name, comment });
  await newComment.save();
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
