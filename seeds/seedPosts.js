require('dotenv').config();
const mongoose = require('mongoose');
const postModel = require('../models/postModel');

mongoose
    .connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB:', process.env.DB_CONNECT);
      })
      .catch((err) => console.error('MongoDB connection failed:', err));
const seedPosts = [
    {
        title: 'First Post',
        content: 'This is the content of the first post.',
        owner: 'User1',
    },
    {
        title: 'Second Post',
        content: 'This is the content of the second post.',
        owner: 'User2',
    },
    {
        title: 'Third Post',
        content: 'This is the content of the third post.',
        owner: 'User1',
    },
];

const seedDatabase = async () => {
    try {
        // Clear existing posts (optional)
        await postModel.deleteMany({});
        console.log('Existing posts deleted');

        await postModel.insertMany(seedPosts);
        console.log('Seed data inserted');

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding database:', error);
        mongoose.connection.close();
    }
};

seedDatabase();