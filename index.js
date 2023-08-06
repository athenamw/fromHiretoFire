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
      db.query("select employee.first_name, employee.last_name, role.title, CONCAT(manager.first_name,' ', manager.last_name) as manager_name from employee left join role on employee.role_id = role.id left join employee manager on manager.id = employee.manager_id;", (err, data) => {
        if (err) {
          console.log(err);
        }
        console.table(data);
      });
    } else if (answer.viewOptions === 'add a department') {
      console.log('user picked add a department');
      inquirer
        .prompt({
          type: 'input',
          name: 'newDept',
          message: 'What is the name of the new department you want to add?',
        })
        .then(function (deptAnswer) {
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
        });
    } else if (answer.viewOptions === 'add a role') {
      console.log('user picked add a role');
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'newRole',
            message: 'What is the name of the new role you want to add?',
          },
          {
            type: 'input',
            name: 'newSalary',
            message: 'How much does this new role make per year?',
          },
          {
            type: 'input',
            name: 'newRoleDept',
            message: 'What department should this role be added to?',
          },
        ])
        .then(function (roleAnswer) {
          console.log(roleAnswer);
          const deptName = [roleAnswer.newRoleDept];
          db.query('SELECT * FROM department WHERE name = ?', deptName, (err, data) => {
            if (err) {
              console.log(err);
            } else {
              console.log(data);
              const roleInfo = [roleAnswer.newRole, roleAnswer.newSalary, data[0].id];
              db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', roleInfo, (err, data) => {
                if (err) {
                  console.log(err);
                } else {
                  db.query('SELECT * FROM role', (err, data) => {
                    console.table(data);
                  });
                }
              });
            }
          });
        });
    } else if (answer.viewOptions === 'add an employee') {
      console.log('user picked add an employee');
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'newEmpFirst',
            message: 'What is the first name of the new employee?',
          },
          {
            type: 'input',
            name: 'newEmpLast',
            message: 'What is the last name of the new employee?',
          },
          {
            type: 'input',
            name: 'newEmpRole',
            message: 'What is the role of the new employee?',
          },
          {
            type: 'input',
            name: 'newEmpMgr',
            message: 'Who is the manager for the new employee?',
          },
        ])
        .then(function (newEmpAns) {
          console.log(newEmpAns);
          const empRole = [newEmpAns.newEmpRole];
          db.query('SELECT * FROM role WHERE title = ?', empRole, (err, role) => {
            if (err) {
              console.log(err);
            } else {
              console.log(role);
              const empMgrName = newEmpAns.newEmpMgr.split(' ');
              db.query('SELECT * FROM employee WHERE first_name = ? and last_name = ?', empMgrName, (err, mgrData) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(mgrData);
                  const newEmpInfo = [newEmpAns.newEmpFirst, newEmpAns.newEmpLast, role[0].id, mgrData[0].id];
                  db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?,?)', newEmpInfo, (err, data) => {
                    if (err) {
                      console.log(err);
                    } else {
                      db.query('SELECT * FROM employee', (err, data) => {
                        console.table(data);
                      });
                    }
                  });
                }
              });
            }
          });
        });
    }
  });
