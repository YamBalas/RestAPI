const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { 
    type: String, 
    required: true 
  },
  owner: { 
    type: String, 
    required: true 
  },
  postId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post', 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

const commentModel = mongoose.model('Comment', commentSchema);

 module.exports = commentModel;


