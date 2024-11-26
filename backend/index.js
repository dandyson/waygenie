const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
const itineraryQueue = require('./jobs/queue');
const Redis = require('ioredis');
const checkJwt = require('./middleware/auth');
require('dotenv').config();
require('./jobs/worker');

const app = express();
const PORT = process.env.PORT || 5000;
const redisConnection = new Redis(process.env.REDISCLOUD_URL);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000' 
];

app.use(cors({ 
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(bodyParser.json());

app.get('/api', checkJwt, (req, res) => res.send('Welcome to WayGenie API'));

app.post('/api/itinerary', checkJwt, async (req, res) => {
  
  const formData = req.body.prompt;
  
  if (!formData) {
    return res.status(400).json({ error: 'Prompt data is missing from the request' });
  }

  const requiredFields = ['location', 'startDate', 'endDate', 'startTime', 'endTime', 'interests', 'travelStyle'];
  const missingFields = requiredFields.filter(field => !formData[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({ error: `Missing fields: ${missingFields.join(', ')}` });
  }

  try {
    const job = await itineraryQueue.add('generateItinerary', formData);

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
    const job = await itineraryQueue.getJob(jobId);

    if (!job) {
      return res.status(404).json({ status: 'Job not found' });
    }

    const isCompleted = await job.isCompleted();
    const isFailed = await job.isFailed();

    if (isCompleted) {
      const result = await job.returnvalue;
      res.json({ status: 'completed', result });
    } else if (isFailed) {
      const error = await job.failedReason;
      res.json({ status: 'failed', error });
    } else {
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
