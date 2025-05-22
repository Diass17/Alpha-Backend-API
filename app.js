const express = require('express');
const path = require('path');

const app = express();

// Serve static files (CSS, JS, images from 'public' folder)
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html on root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Port Number
const PORT = process.env.PORT || 3000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
