require('dotenv').config();
const mongoose = require('mongoose');
const postModel = require('../models/postModel');

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
        // Explicitly log the connection string (careful with sensitive info)
        console.log('Attempting to connect to:', process.env.DB_CONNECT);

        // Ensure connection is established before proceeding
        await mongoose.connect(process.env.DB_CONNECT);

        console.log('MongoDB Connection State:', mongoose.connection.readyState);
        
        // Delete existing documents
        const deleteResult = await postModel.deleteMany({});
        console.log('Existing posts deleted. Deleted count:', deleteResult.deletedCount);

        // Insert new documents
        const insertResult = await postModel.insertMany(seedPosts);
        console.log('Seed data inserted. Inserted count:', insertResult.length);
        
        // Log the inserted documents for verification
        console.log('Inserted Posts:', JSON.stringify(insertResult, null, 2));

    } catch (error) {
        console.error('Detailed Seeding Error:');
        console.error('Error Name:', error.name);
        console.error('Error Message:', error.message);
        console.error('Full Error Object:', JSON.stringify(error, null, 2));
    } finally {
        // Always close the connection
        await mongoose.connection.close();
    }
};

seedDatabase();