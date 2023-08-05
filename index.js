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
    } else if (answer.viewOptions === 'view all roles') {
      console.log('user picked view all roles');
      db.query('SELECT * FROM role', (err, data) => {
        if (err) {
          console.log(err);
        }
        console.table(data);
      });
    } else if (answer.viewOptions === 'view all employees') {
      console.log('user picked view all employees');
      db.query("select employee.first_name,      employee.last_name, role.title, CONCAT(manager.first_name,' ', manager.last_name) as manager_name from employee left join role on employee.role_id = role.id left join employee manager on manager.id = employee.manager_id;", (err, data) => {
        if (err) {
          console.log(err);
        }
        console.table(data);
      });
    } else if (answer.viewOptions === 'add a department') {
      console.log('user picked add a department');
      inquirer.prompt({
        type: 'input',
        name: 'newDept',
        message: 'What is the name of the new department you want to add?'
      }).then(function(deptAnswer){
        console.log(deptAnswer);
        const info = [deptAnswer.newDept];
      db.query('INSERT INTO department (name) VALUES (?)', info, (err, data) => {
        if (err) {
          console.log(err);
        }
        db.query('SELECT * FROM department', (err, data) => {
          console.table(data);
        });
      });
    })
  }
  });
