const express = require('express');
const {
  addComment,
  getAllComments,
  getCommentById,
  updateComment,
} = require('../controllers/commentController');

const router = express.Router();

router.post('/', addComment);
router.get('/', getAllComments);
router.get('/:id', getCommentById);
router.put('/:id', updateComment);

// Example route
router.get('/', (req, res) => {
    res.send('Comment route is working!');
  });

module.exports = router;
