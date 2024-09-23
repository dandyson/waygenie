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

app.use(cors());
app.use(bodyParser.json());

// API routes
app.get('/api', (req, res) => {
  res.send('Welcome to WayGenie API');
});

// OpenAI
app.post('/chat', async (req, res) => {
  const { formData } = req.body;

  try {
    const guide = "You are a travel Itinerary creator. Take the following data and make a itinerary out of it: ";
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Use the appropriate model
      messages: [
        { role: 'user', content: guide + formData},
      ],
    });

    const response = completion.choices[0].message.content;

    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
