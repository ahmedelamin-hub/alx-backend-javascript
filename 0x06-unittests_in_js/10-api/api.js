const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json()); // Middleware to parse JSON body

// Existing root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the payment system');
});

// Cart endpoint
app.get('/cart/:id(\\d+)', (req, res) => {
  const cartId = req.params.id;
  res.send(`Payment methods for cart ${cartId}`);
});

// New available payments endpoint
app.get('/available_payments', (req, res) => {
  res.json({
    payment_methods: {
      credit_cards: true,
      paypal: false,
    }
  });
});

// New login endpoint
app.post('/login', (req, res) => {
  const userName = req.body.userName;
  if (!userName) {
    return res.status(400).send('Username is required');
  }
  res.send(`Welcome ${userName}`);
});

// Start the server
const PORT = 7865;
app.listen(PORT, () => {
  console.log(`API available on localhost port ${PORT}`);
});

module.exports = app;
