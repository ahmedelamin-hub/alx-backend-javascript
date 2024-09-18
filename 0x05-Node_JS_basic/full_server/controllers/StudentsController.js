// full_server/controllers/StudentsController.js
const readDatabase = require('../utils');

class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const databasePath = process.argv[2];
      const students = await readDatabase(databasePath);
      let response = 'This is the list of our students\n';

      for (const [field, names] of Object.entries(students).sort(([a], [b]) => a.localeCompare(b))) {
        response += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
      }

      res.status(200).send(response.trim());
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;

    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    try {
      const databasePath = process.argv[2];
      const students = await readDatabase(databasePath);
      const studentList = students[major] || [];

      res.status(200).send(`List: ${studentList.join(', ')}`);
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }
}

module.exports = StudentsController;
