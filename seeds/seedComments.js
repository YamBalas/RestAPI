require('dotenv').config();
const mongoose = require('mongoose');
const commentModel = require('../models/commentModel'); // Assuming you have a comment model defined

const seedComments = [
    {
        content: 'This is the first comment.',
        owner: 'User1',
        postId: '67543d4ce1cd97471bb8e479', 
        createdAt: new Date(),
    },
    {
        content: 'This is the second comment.',
        owner: 'User2',
        postId: '67543d4ce1cd97471bb8e47a', 
        createdAt: new Date(),
    },
    {
        content: 'This is a comment on another post.',
        owner: 'User3',
        postId: '67543d4ce1cd97471bb8e47b', 
        createdAt: new Date(),
    },
];

const seedDatabase = async () => {
    try {
        console.log('Attempting to connect to:', process.env.DB_CONNECT);
        await mongoose.connect(process.env.DB_CONNECT);

        console.log('MongoDB Connection State:', mongoose.connection.readyState);

        // Delete existing documents
        const deleteResult = await commentModel.deleteMany({});
        console.log('Existing comments deleted. Deleted count:', deleteResult.deletedCount);

        // Insert new documents
        const insertResult = await commentModel.insertMany(seedComments);
        console.log('Seed data inserted. Inserted count:', insertResult.length);

        // Log the inserted documents for verification
        console.log('Inserted Comments:', JSON.stringify(insertResult, null, 2));

    } catch (error) {
        console.error('Detailed Seeding Error:');
        console.error('Error Name:', error.name);
        console.error('Error Message:', error.message);
        console.error('Full Error Object:', JSON.stringify(error, null, 2));
    } finally {
        await mongoose.connection.close();
    }
};

seedDatabase();
