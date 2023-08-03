const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'password',
    database: 'employeeTracker_db',
  },
  console.log(`Connected to the employeeTracker_db database.`)
);
inquirer
  .prompt([
    {
      type: 'list',
      name: 'viewOptions',
      message: 'What would you like to do?',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
    },
  ])
  .then(function (answer) {
    console.log(answer);
    if (answer.viewOptions === 'view all departments') {
      console.log('user picked view all departments');
      db.query('SELECT * FROM department', (err, data) => {
        if (err) {
          console.log(err);
        }
        console.table(data);
      });
    }
  });
