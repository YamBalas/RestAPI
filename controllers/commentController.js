const mongoose = require('mongoose');
const commentModel = require('../models/commentModel'); 

// Create a new comment
const createComment = async (req, res) => {
    try {
        const { content, owner, postId } = req.body;

        // Validate required fields
        if (!content || !owner || !postId) {
            return res.status(400).json({ error: 'Content, owner, and postId are required.' });
        }

        const newComment = new commentModel({ content, owner, postId });
        const savedComment = await newComment.save();

        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all comments (with optional filtering by postId)
const getAllComments = async (req, res) => {
    try {
        const { postId } = req.query;

        const filter = postId ? { postId } : {};
        const comments = await commentModel.find(filter).populate('postId').sort({ createdAt: -1 });

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single comment by ID
const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await commentModel.findById(id).populate('postId');
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found.' });
        }

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a comment
const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        // Only content can be updated for now
        if (!content) {
            return res.status(400).json({ error: 'Content is required to update.' });
        }

        const updatedComment = await commentModel.findByIdAndUpdate(
            id,
            { content },
            { new: true, runValidators: true }
        );

        if (!updatedComment) {
            return res.status(404).json({ error: 'Comment not found.' });
        }

        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createComment,
    getAllComments,
    getCommentById,
    updateComment,
};
