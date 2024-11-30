
const mongoose = require('mongoose');
const postModel = require('../models/postModel');

const addPost = async (req, res) => {
  try {
    // Extract data from the request body
    const { title, content, owner } = req.body;

    // Validate required fields
    if (!title || !content || !owner) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new post instance
    const newPost = new Post({
      title,
      content,
      owner
    });

    // Save the post to the db
    const savedPost = await newPost.save();

    res.status(201).json({
      message: 'Post created successfully',
      post: savedPost
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const filter = req.query.owner;
    let posts;

    if (filter) {
      posts = await postModel.find({ owner: filter });
    } else {
      posts = await postModel.find();
    }

    res.status(200).json({ data: posts, message: 'Posts retrieved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPostById = async (req, res) => {
  const postId = req.params.id;

  try {
    // Validate the postId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    // Fetch the post
    const post = await postModel.findById(postId);

    if (post) {
      res.status(200).json({ data: post, message: 'Post retrieved successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  const postId = req.params.id;

  try {
    // Validate the post ID
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    // Validate the input data
    const { title, content, owner } = req.body;
    if (!title && !content && !owner) {
      return res.status(400).json({ message: 'At least one field (title, content, or owner) is required to update' });
    }

    // Update the post in the database
    const updatedPost = await postModel.findByIdAndUpdate(
      postId,
      req.body,
      { new: true } // Return the updated post
    );

    // When post does not exist
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Return success response with the updated post
    res.status(200).json({
      message: 'Post updated successfully',
      data: updatedPost
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'An error occurred while updating the post',
      error: error.message
    });
  }
};

module.exports = {
  addPost,
  getAllPosts,
  getPostById,
  updatePost
};