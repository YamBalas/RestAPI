const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import routes
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());

//debug line
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

// Use routes
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

const port = process.env.PORT || 3000;

// MongoDB connection
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});