const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
require('dotenv').config();

// OpenAI Config
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [process.env.REACT_APP_FRONTEND_URL, 'http://localhost:3000'];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: false,
}));

app.use(bodyParser.json());

// API routes
app.get('/api', (req, res) => {
  res.send('Welcome to WayGenie API');
});

app.post('/chat', async (req, res) => {
  const formData = req.body.prompt; // Access formData from prompt

  try {
    const guide = 
    `You are a travel itinerary creator. Based on the provided details, generate a travel itinerary that is organized and easy to follow.

    Your response must be a JSON object that follows this exact structure, but please do not use this content, make your own from the formData provided:
    {
      "introduction": "Introduction based on the location and travel style.",
      "itinerary": "<ul>",
      "events": [
        {
          "title": "Event 1 based on user interests",
          "time": "Specific time range",
          "description": "Event description."
        },
        {
          "title": "Event 2 based on user interests",
          "time": "Specific time range",
          "description": "Event description."
        }
      ],
      "travelMethods": "How to travel between events (walking, public transport, etc.)."
    }

    ### Requirements:
    1. **Travel Proximity**: Ensure that all events are close enough to each other to avoid significant back-and-forth travel or long transit times.
    2. **Food Recommendations**: 
      - Recommend well-reviewed, pleasant food places. If the travelStyle is "ASAP," suggest fast food options.
    3. **Travel Suggestions**: 
      - Specify how to travel between events, including which bus, train, or walking directions to use.

    ### Itinerary Data:
    - Location: ${formData.location}
    - Date: ${formData.startDate} to ${formData.endDate}
    - Time: ${formData.startTime} to ${formData.endTime}
    - Interests: ${formData.interests.join(', ')}
    - Travel Style: ${formData.travelStyle}

    Use this information to create a detailed, structured itinerary tailored to the interests and travel style provided. Make sure to return the output as a valid JSON object, not as a string representation.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: guide },
        { role: 'user', content: JSON.stringify(formData) }, // Stringify formData for the user message
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;

    res.send(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
