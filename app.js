const express = require('express');
const app = express();
const dotenv = require('dotenv').config();

const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect(process.env.DB_CONNECT);
const db = mongoose.connection;
db.once('connected', () => console.log('Connected to MongoDB'));
db.on('error', (error) => console.error('MongoDB connection failed:', error));

// Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
// Use routes
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

const port = process.env.PORT;

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});