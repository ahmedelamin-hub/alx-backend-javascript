import express from 'express';
import fs from 'fs';

const app = express();
const port = 1245;

function readStudentData(database) {
  return new Promise((resolve, reject) => {
    fs.readFile(database, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        const lines = data.split('\n').filter((line) => line.trim() !== '');
        const students = lines.slice(1).map((line) => line.split(','));
        const studentCount = students.length;
        const csStudents = students.filter((student) => student[3] === 'CS');
        const sweStudents = students.filter((student) => student[3] === 'SWE');

        const output = [
          `Number of students: ${studentCount}`,
          `Number of students in CS: ${csStudents.length}. List: ${csStudents.map((s) => s[0]).join(', ')}`,
          `Number of students in SWE: ${sweStudents.length}. List: ${sweStudents.map((s) => s[0]).join(', ')}`,
        ].join('\n');

        resolve(output);
      }
    });
  });
}

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const databaseFile = process.argv[2]; // Get the database file from the command line argument

  readStudentData(databaseFile)
    .then((studentData) => {
      res.send(`This is the list of our students\n${studentData}`);
    })
    .catch((error) => {
      res.send(`This is the list of our students\n${error.message}`);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
