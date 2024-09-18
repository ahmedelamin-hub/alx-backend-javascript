// Import necessary modules
const express = require('express'); // Express for creating the HTTP server
const fs = require('fs'); // File system module to read the database file
const path = require('path'); // Path module (not used but commonly imported for file paths)

// Create an Express app
const app = express();

// Define the port number for the HTTP server to listen on
const PORT = 1245;

/**
 * Reads a CSV file asynchronously and processes student information.
 * @param {string} filePath - The path to the CSV file containing student data.
 * @returns {Promise<string>} - A promise that resolves to a formatted string of student info.
 */
function countStudents(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database')); // If error occurs, reject with error message
      } else {
        const lines = data.split('\n').filter((line) => line.trim() !== ''); // Split and filter out empty lines
        const studentsByField = {}; // Object to store students by their field
        let totalStudents = 0;

        // Process each line (except header) to extract student info
        lines.slice(1).forEach((line) => {
          const [firstName, , , field] = line.split(','); // Extract firstName and field from CSV
          if (field) {
            if (!studentsByField[field]) {
              studentsByField[field] = [];
            }
            studentsByField[field].push(firstName); // Add student's name to the respective field
            totalStudents += 1;
          }
        });

        // Build the result string with student counts and details by field
        let result = `Number of students: ${totalStudents}\n`;
        for (const [field, students] of Object.entries(studentsByField)) {
          result += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
        }

        resolve(result.trim()); // Return the final formatted result
      }
    });
  });
}

// Define the root route for the server ("/")
app.get('/', (req, res) => {
  res.send('Hello Holberton School!'); // Respond with a simple message
});

// Define the /students route to display student info from CSV
app.get('/students', (req, res) => {
  const dbFilePath = process.argv[2]; // Get the database file path from command line arguments

  // If no database file is provided, respond with an error
  if (!dbFilePath) {
    res.status(500).send('Database file not provided');
    return;
  }

  // Call the function to count students and handle the response
  countStudents(dbFilePath)
    .then((studentList) => {
      res.send(`This is the list of our students\n${studentList}`);
    })
    .catch((error) => {
      res.status(500).send(error.message); // Handle errors in reading or processing the CSV
    });
});

// Start the HTTP server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`); // Log when the server starts
});

// Export the app variable (to allow external usage if needed)
module.exports = app;
