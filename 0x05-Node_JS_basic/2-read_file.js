const fs = require('fs');

function countStudents(path) {
  try {
    // Read the file synchronously
    const data = fs.readFileSync(path, 'utf8');

    // Split the content by line, ignoring empty lines
    const lines = data.trim().split('\n').filter((line) => line.length > 0);

    // If the file has no data beyond headers
    if (lines.length <= 1) {
      throw new Error('Cannot load the database');
    }

    const fields = {};
    const totalStudents = lines.slice(1).reduce((count, line) => {
      const [firstname, lastname, age, field] = line.split(',');

      // Skip invalid lines without a proper number of columns
      if (!firstname || !lastname || !age || !field) return count;

      // Add the student to the corresponding field group
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstname);

      return count + 1;
    }, 0);

    console.log(`Number of students: ${totalStudents}`);

    // Log the number of students in each field
    for (const [field, students] of Object.entries(fields)) {
      console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
    }
  } catch (error) {
    // Handle any errors (e.g., file not found)
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
