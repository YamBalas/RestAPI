const express = require('express');
const commentController = require('../controllers/commentController');
const router = express.Router();

router.post('/', commentController.createComment);
router.get('/', commentController.getAllComments);
router.get('/:id', commentController.getCommentById);
router.put('/:id', commentController.updateComment);

module.exports = router;
