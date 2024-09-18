// full_server/utils.js
const fs = require('fs').promises;

async function readDatabase(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');
    const students = {};

    lines.slice(1).forEach((line) => {
      const [firstName, , , field] = line.split(',');

      if (field) {
        if (!students[field]) {
          students[field] = [];
        }
        students[field].push(firstName);
      }
    });

    return students;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = readDatabase;
