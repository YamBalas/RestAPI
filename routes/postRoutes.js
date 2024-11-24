const express = require('express');
const {
  addPost,
  getAllPosts,
  getPostById,
  updatePost,
} = require('../controllers/postController');

const router = express.Router();

router.post('/', addPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', updatePost);

// Example route
router.get('/', (req, res) => {
    res.send('Post route is working!');
  });

module.exports = router;
