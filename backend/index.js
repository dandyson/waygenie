const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// API route
app.get('/api', (req, res) => {
  res.send('Welcome to WayGenie API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
