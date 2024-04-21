const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const ideaRoutes = require('./routes/idea');

const app = express();
const port = 3000; 

// Connect to MongoDB
mongoose.connect('mongodb+srv://localhost/match_ideas', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Routes
app.use('/user', userRoutes);
app.use('/idea', ideaRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
