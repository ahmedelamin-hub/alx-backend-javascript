const http = require('http');

const PORT = 1245;

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Holberton School!\n');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

module.exports = app;
