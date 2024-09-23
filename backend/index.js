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

app.post('/chat', async (req, res) => {
  const formData = req.body.prompt; // Access formData from prompt

  console.log('Received formData:', formData);  // Log the formData to verify

  try {
    const guide = 
      `You are a travel itinerary creator. Based on the provided details, generate a travel itinerary that is organized and easy to follow.

      The response should follow this format:
      
      - Brief introduction summarizing the trip
      - Itinerary as a list inside a <ul class="m-8 max-w-screen-md">
      - Each event should be a list item inside a <li class="group relative flex flex-col pb-8 pl-7 last:pb-0">
      - Inside each <li> tag, include:
        <div class="absolute bottom-0 left-[calc(0.25rem-0.5px)] top-0 w-px bg-blue-700/10 group-first:top-3"></div>
        <div class="absolute left-0 top-2 h-2 w-2 rounded-full border border-sky-300 bg-zinc-950"></div>
        <h3 class="mt-2 font-semibold text-2xl">[TITLE OF THE EVENT]</h3>
        <p class="font-display text-2xs/6 order-first font-semibold tracking-[0.2em] text-sky-500">
          <time dateTime="[EVENT DATE AND TIME IN ISO FORMAT]">[EVENT TIME IN FORMAT, LIKE THIS: 12:30 PM]</time>
        </p>
        <p class="mt-0.5 text-md/6 text-zinc-400">[DESCRIPTION OF THE EVENT]</p>
        </div>
      </div>

      Here are the requirements:

      1. **Travel Proximity**: Ensure that all events are close enough to each other. Avoid itineraries that involve significant back-and-forth travel or long transit times.
      
      2. **Food Recommendations**: 
         - For food places, ensure they are well-reviewed and pleasant to visit. If the travelStyle is set to "ASAP," recommend fast food options.
         
      3.**Travel Suggestions**: 
         - Suggest ways to travel between events. For example, specify if the user should take a particular bus, train, or walk a certain distance.

      Here is the data for the itinerary:
      - Location: ${formData.location}
      - Date: ${formData.startDate} to ${formData.endDate}
      - Time: ${formData.startTime} to ${formData.endTime}
      - Interests: ${formData.interests.join(', ')}
      - Travel Style: ${formData.travelStyle}

      Use this information to create a detailed, structured itinerary. Ensure the itinerary is tailored to the interests and travel style provided, and format the output as specified.`;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: guide },
        { role: 'user', content: JSON.stringify(formData) }, // Stringify formData for the user message
      ],
      max_tokens: 2000, // Set the maximum number of tokens in the response
      temperature: 0.7, // Set the temperature for creativity and randomness
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
