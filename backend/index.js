const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
const chatQueue = require('./jobs/queue');
const Redis = require('ioredis');
const checkJwt = require('./middleware/auth');
require('dotenv').config();
require('./jobs/worker');

const app = express();
const PORT = process.env.PORT || 5000;
const redisConnection = new Redis(process.env.REDISCLOUD_URL);

// Configure OpenAI instance
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Configure CORS
const allowedOrigins = [process.env.REACT_APP_FRONTEND_URL, 'http://localhost:3000'];
app.use(cors({ origin: allowedOrigins, methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: false }));

app.use(bodyParser.json());

// Basic API route
app.get('/api', checkJwt, (req, res) => res.send('Welcome to WayGenie API'));

// Chat route for generating travel itineraries
app.post('/api/itinerary', checkJwt, async (req, res) => {
  
  const formData = req.body.prompt;
  
  if (!formData) {
    return res.status(400).json({ error: 'Prompt data is missing from the request' });
  }

  // Validate required fields
  const requiredFields = ['location', 'startDate', 'endDate', 'startTime', 'endTime', 'interests', 'travelStyle'];
  const missingFields = requiredFields.filter(field => !formData[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({ error: `Missing fields: ${missingFields.join(', ')}` });
  }

  try {
    // Add a job to the queue
    const job = await chatQueue.add('generateItinerary', formData);

    res.status(202).json({ message: 'Job queued', jobId: job.id });
  } catch (error) {
    console.error('Error adding job to queue:', error);
    res.status(500).json({ error: 'Failed to queue job' });
  }
});

// Check a job's status
app.get('/api/itinerary/status/:jobId', checkJwt, async (req, res) => {
  const jobId = req.params.jobId;
  
  try {
    // Find the job in the queue
    const job = await chatQueue.getJob(jobId);

    if (!job) {
      return res.status(404).json({ status: 'Job not found' });
    }

    const isCompleted = await job.isCompleted();
    const isFailed = await job.isFailed();

    if (isCompleted) {
      // Job completed, return the result
      const result = await job.returnvalue;
      res.json({ status: 'completed', result });
    } else if (isFailed) {
      // Job failed, return the error
      const error = await job.failedReason;
      res.json({ status: 'failed', error });
    } else {
      // Job is still in progress
      res.json({ status: 'in-progress' });
    }
  } catch (error) {
    console.error('Error fetching job status:', error);
    res.status(500).json({ status: 'error', error: 'Could not fetch job status' });
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
