const fs = require('fs').promises;

function countStudents(path) {
  return fs.readFile(path, 'utf8')
    .then((data) => {
      const lines = data.trim().split('\n').filter((line) => line.length > 0);

      if (lines.length <= 1) {
        throw new Error('Cannot load the database');
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

      console.log(`Number of students: ${totalStudents}`);

      for (const [field, students] of Object.entries(fields)) {
        console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
      }
    })
    .catch(() => {
      throw new Error('Cannot load the database');
    });
}

module.exports = countStudents;
