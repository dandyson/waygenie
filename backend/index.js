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
  const formData = req.body.prompt; // Access formData from prompty

  try {
    const guide = 
    `You are a travel itinerary creator. Based on the provided details, generate a travel itinerary that is organized and easy to follow.

    Your response must be a JSON object that follows this exact structure:

    {
        "introduction": "Welcome to your laid-back, coffee-inspired day trip in the bustling city of London. This itinerary is designed to provide you with a relaxing experience, immersing you in the rich coffee culture of the city. Enjoy your journey!",
        "itinerary": "<ul className='m-8 max-w-screen-md'>",
        "events": [
            { "title": "Visit to the British Museum", "time": "10:20 AM - 11:20 AM", "description": "Start your day with a visit to the British Museum. Explore the Enlightenment Gallery, which showcases the age of reason, science, and the power of collecting. Don't forget to grab a coffee at the museum's café." },
            { "title": "Visit to Monmouth Coffee Company", "time": "11:40 AM - 12:10 PM", "description": "Enjoy a cup of coffee at Monmouth Coffee Company, a well-reviewed coffee shop known for its quality beans and brewing methods." },
            { "title": "Lunch at The Espresso Room", "time": "12:30 PM - 1:30 PM", "description": "Have a laid-back lunch at The Espresso Room, a café that serves excellent coffee and light meals. Their avocado toast is a must-try." }
        ],
        "travelMethods": "This itinerary involves walking and the use of public transportation. The London Underground, also known as the Tube, is a convenient and efficient way to get around the city. To reach Monmouth Coffee Company from the British Museum, take the tube from Tottenham Court Road Station to Covent Garden Station. From Monmouth Coffee Company to The Espresso Room, it's a short walk that will take around 10 minutes."
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
