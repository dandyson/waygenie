const { Worker } = require("bullmq");
const OpenAI = require('openai');
const Redis = require("ioredis");

const openaiChat = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Redis configuration
const redisConnection = new Redis(process.env.REDISCLOUD_URL, {
  maxRetriesPerRequest: null, // Set maxRetriesPerRequest to null
});

// Create a new worker to process jobs
const worker = new Worker(
  "chatQueue",
  async (job) => {

    const formData = job.data;

    // Define the guide text for OpenAI
    const guide = `You are a travel itinerary creator. Based on the provided details, generate a travel itinerary that is organized and easy to follow.

    Your response must be a JSON object that follows this exact structure, but please do not use this content, make your own from the formData provided:
    {
      "introduction": "Introduction based on the location and travel style.",
      "itinerary": "<ul>",
      "events": [
        {
          "title": "Event 1 based on user interests",
          "time": "Specific time range",
          "description": "Event description, including postcode of the venue."
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
    - Interests: ${formData.interests.join(", ")}
    - Travel Style: ${formData.travelStyle}

    Use this information to create a detailed, structured itinerary tailored to the interests and travel style provided. Make sure to return the output as a valid JSON object, not as a string representation.`;

    // Simulate OpenAI API call (replace with actual logic)
    const result = await openaiChat.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: guide },
        { role: "user", content: JSON.stringify(formData) }, // Stringify formData for the user message
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    // Retrieve the result and send it back
    const response = result.choices[0].message.content;

    return response;
  },
  {
    connection: redisConnection,
  }
);

// Worker event listeners (optional)
worker.on("completed", (job, returnValue) => {
  console.log(`Job ${job.id} completed with result: ${returnValue}`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed with error: ${err.message}`);
});
