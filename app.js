// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');  // Added for static file serving
const studentRoutes = require('./routes/studentRoutes');  // Routes for students

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Serve the static HTML file
app.use(express.static(path.join(__dirname, 'views')));


// Routes
app.use('/api/students', studentRoutes);  // API routes for students

// Start the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
