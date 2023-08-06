const inquirer = require('inquirer');
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
// List of options to select
inquirer
  .prompt([
    {
      type: 'list',
      name: 'viewOptions',
      message: 'What would you like to do?',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
    },
  ])
  // this function is for view all departments
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
      // This section is to view all roles
    } else if (answer.viewOptions === 'view all roles') {
      console.log('user picked view all roles');
      db.query('SELECT * FROM role', (err, data) => {
        if (err) {
          console.log(err);
        }
        console.table(data);
      });
      // This section is to view all employee info
    } else if (answer.viewOptions === 'view all employees') {
      console.log('user picked view all employees');
      db.query("select employee.first_name, employee.last_name, role.title, CONCAT(manager.first_name,' ', manager.last_name) as manager_name from employee left join role on employee.role_id = role.id left join employee manager on manager.id = employee.manager_id;", (err, data) => {
        if (err) {
          console.log(err);
        }
        console.table(data);
      });
      // This section adds a department
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
      // This section is to add a role
    } else if (answer.viewOptions === 'add a role') {
      console.log('user picked add a role');
      inquirer
        // These are the questions about the role
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
        // This is to get the department id
        .then(function (roleAnswer) {
          console.log(roleAnswer);
          const deptName = [roleAnswer.newRoleDept];
          db.query('SELECT * FROM department WHERE name = ?', deptName, (err, data) => {
            if (err) {
              console.log(err);
            } else {
              console.log(data);
              // This variable takes the information from in users input
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
      // This section adds an employee
    } else if (answer.viewOptions === 'add an employee') {
      console.log('user picked add an employee');
      inquirer
        // These ask the user for information about the employee
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
        // This gets the role id information
        .then(function (newEmpAns) {
          console.log(newEmpAns);
          const empRole = [newEmpAns.newEmpRole];
          db.query('SELECT * FROM role WHERE title = ?', empRole, (err, role) => {
            if (err) {
              console.log(err);
            } else {
              console.log(role);
              // This gathers the manager id information
              const empMgrName = newEmpAns.newEmpMgr.split(' ');
              db.query('SELECT * FROM employee WHERE first_name = ? and last_name = ?', empMgrName, (err, mgrData) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(mgrData);
                  // This inserts the new employee into the db
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
    } else if (answer.viewOptions === 'update an employee role') {
      console.log('user picked update an employee role');
      inquirer
        // questions to know which employee to update
        .prompt([
          {
            type: 'input',
            name: 'updateEmp',
            message: 'Which employee do you want to update?',
          },
          {
            type: 'input',
            name: 'updateEmpRole',
            message: 'What is the new role for this employee?',
          },
        ])
        // This is to get the department id
        .then(function (updateEmpAnswers) {
          console.log(updateEmpAnswers);
          const nameEmpUpdate = updateEmpAnswers.updateEmp.split(' ');
          db.query('SELECT * FROM employee WHERE first_name = ? and last_name = ?', nameEmpUpdate, (err, empData) => {
            if (err) {
              console.log(err);
            } else {
              console.log(empData);
              db.query('SELECT * FROM role WHERE title = ?', updateEmpAnswers.updateEmpRole, (err, role) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(role);
                  // This variable takes the information from in users input
                  const updateRoleInfo = [role[0].id, empData[0].id];
                  db.query('UPDATE employee SET role_id = ? WHERE id = ?', updateRoleInfo, (err, data) => {
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
