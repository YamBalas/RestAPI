const postModel = require('../models/postModel');

const getPostById = async (req, res) => {
    const postId = req.params.id;
    try {
        console.log('Posts get by id service');
        const post = await postModel.findById(postId);
        res.status(200).send(post);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getAllPosts = async (req, res) => {
    const ownerFilter = req.query.owner;
    try {
        console.log('Posts get all posts service');
        if (ownerFilter) {
            const posts = await postModel.find({ owner: ownerFilter });
            res.status(200).send(posts);
        } else {
            const posts = await postModel.find();
            res.status(200).send(posts);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const createPost = async (req, res) => {
    const post = req.body;
    try {
        console.log('Posts create service');
        const newPost = await postModel.create(post);
        res.status(201).send(newPost);
    } catch (error) {
        res.status(400).send(error);
    }
};

const deletePost = async (req, res) => {
    const postId = req.params.id;
    try {   
        console.log('Posts delete service');
        const deletedPost = await postModel.findByIdAndDelete(postId);
        res.status(200).send(deletedPost);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const updatePost = async (req, res) => {
    const postId = req.params.id;
    const post = req.body;
    try {
        console.log('Posts update service');
        const updatedPost = await postModel.findByIdAndUpdate(postId, post, { new: true });
        res.status(200).send(updatedPost);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    getPostById,
    getAllPosts,
    createPost,
    deletePost,
    updatePost
};