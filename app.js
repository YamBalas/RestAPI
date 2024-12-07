const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const express = require('express');
const app = express();

// Import routes
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

// Middleware
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// MongoDB connection
mongoose.connect(process.env.DB_CONNECT);
const db = mongoose.connection;
db.once('connected', () => console.log('Connected to MongoDB'));
db.on('error', (error) => console.error('MongoDB connection failed:', error));

const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});