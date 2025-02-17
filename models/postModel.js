const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  title: { 
    type: String, 
    required: true 
    },
  content: { 
    type: String, 
    required: true 
    },
  owner: { 
    type: String, 
    required: true 
    },
  createdAt: { 
    type: Date, 
    default: Date.now 
    },
});

 const postModel = mongoose.model('Post', postSchema);

 module.exports = postModel;
