import express from 'express';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';

// Promisified readFile
const readFileAsync = promisify(fs.readFile);

const app = express();

// Function to read and process the CSV database
const readDatabase = async (filePath) => {
  try {
    const content = await readFileAsync(filePath, { encoding: 'utf-8' });
    const lines = content.split('\n').filter((line) => line.trim() !== '');
    
    const fields = {};
    let totalStudents = 0;
    
    for (let i = 1; i < lines.length; i++) {
      const student = lines[i].split(',');
      const field = student[3];
      const firstName = student[0];
      
      if (!fields[field]) {
        fields[field] = [];
      }
      
      fields[field].push(firstName);
      totalStudents++;
    }

    return { totalStudents, fields };
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

// Route: "/"
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Route: "/students"
app.get('/students', async (req, res) => {
  const databaseFile = process.argv[2];

  try {
    const { totalStudents, fields } = await readDatabase(databaseFile);
    
    let response = 'This is the list of our students\n';
    response += `Number of students: ${totalStudents}\n`;
    
    Object.keys(fields)
      .sort((a, b) => a.localeCompare(b)) // Sort fields alphabetically
      .forEach((field) => {
        const list = fields[field].join(', ');
        response += `Number of students in ${field}: ${fields[field].length}. List: ${list}\n`;
      });
    
    res.send(response.trim());
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server on port 1245
app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

export default app;
