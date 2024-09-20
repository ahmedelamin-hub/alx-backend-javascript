const express = require('express');
const app = express();

// Existing root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the payment system');
});

// New cart endpoint with regex validation for :id (must be a number)
app.get('/cart/:id(\\d+)', (req, res) => {
  const cartId = req.params.id;
  res.send(`Payment methods for cart ${cartId}`);
});

// 404 for invalid cart id (non-numeric)
app.get('/cart/*', (req, res) => {
  res.status(404).send('Invalid cart ID');
});

// Start the server
const PORT = 7865;
app.listen(PORT, () => {
  console.log(`API available on localhost port ${PORT}`);
});

module.exports = app;
