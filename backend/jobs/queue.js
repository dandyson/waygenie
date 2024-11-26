const { Queue } = require('bullmq');
const Redis = require('ioredis');

const connection = new Redis(process.env.REDISCLOUD_URL, {
    maxRetriesPerRequest: null,
});

const itineraryQueue = new Queue('itineraryQueue', { connection });

module.exports = itineraryQueue;