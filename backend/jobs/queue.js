const { Queue } = require('bullmq');
const Redis = require('ioredis');

// Create a Redis connection using the REDISCLOUD_URL environment variable
const connection = new Redis(process.env.REDISCLOUD_URL, {
    maxRetriesPerRequest: null,  // Set maxRetriesPerRequest to null
});

// Create and export a new queue instance
const chatQueue = new Queue('chatQueue', { connection });

module.exports = chatQueue;