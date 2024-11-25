const addComment = async (req, res) => {
    try {
        // comment creation logic
        res.status(201).json({ message: 'Comment created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };
  
  const getAllComments = async (req, res) => {
    try {
        // get all comments logic
        res.status(200).json({ message: 'All comments retrieved' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };
  
  const getCommentById = async (req, res) => {
    try {
        // get comment by id logic
        res.status(200).json({ message: 'Comment retrieved' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };
  
  const updateComment = async (req, res) => {
    try {
        // update comment logic
        res.status(200).json({ message: 'Comment updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = {
    addComment,
    getAllComments,
    getCommentById,
    updateComment
  };