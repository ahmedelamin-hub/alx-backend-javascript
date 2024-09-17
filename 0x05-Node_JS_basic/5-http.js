const http = require('http');
const fs = require('fs').promises;

// Define the port the server will listen on
const PORT = 1245;

// Function to count students and generate the output message
const countStudents = async (databasePath) => {
  try {
    const data = await fs.readFile(databasePath, 'utf8');
    const lines = data.trim().split('\n').filter(line => line.length > 0);

    if (lines.length <= 1) {
      return 'Cannot load the database';
    }

    const fields = {};
    const totalStudents = lines.slice(1).reduce((count, line) => {
      const [firstname, lastname, age, field] = line.split(',');

      if (!firstname || !lastname || !age || !field) return count;

      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstname);

      return count + 1;
    }, 0);

    let result = `Number of students: ${totalStudents}\n`;

    for (const [field, students] of Object.entries(fields)) {
      result += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
    }

    return result;
  } catch (error) {
    return 'Cannot load the database';
  }
};

// Create the HTTP server
const app = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathName = url.pathname;

  if (pathName === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Holberton School!\n');
  } else if (pathName === '/students') {
    const databasePath = process.argv[2];

    if (!databasePath) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Database path not provided\n');
      return;
    }

    const studentList = await countStudents(databasePath);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`This is the list of our students\n${studentList}`);
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found\n');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

// Export the app variable
module.exports = app;
