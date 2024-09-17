// Import the Express module
const express = require('express');

// Create an Express app
const app = express();

// Define the port to listen on
const PORT = 1245;

// Set up the root route
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// Export the app variable
module.exports = app;
