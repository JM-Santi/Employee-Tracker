
const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");

// Connection
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "tracker_db",
});

db.connect(function (err) {
  if (err) throw err;
  options();
});

// Starting Menu
function options() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "What would you like to do first?",
        choices: [
          "View All",
          "View All Departments",
          "View All Employees",
          "View All roles",
          "Add new department",
          "Add new role",
          "Add new employee",
          "Update employee role",
          "Quit prompts",
        ],
      },
    ])
    .then((answer) => {
      if (answer.menu === "View All") {
        viewAll();
      } else if (answer.menu === "View All Departments") {
        viewDepts();
      } else if (answer.menu === "View All Employees") {
        viewEmployees();
      } else if (answer.menu === "Add new employee") {
        addEmployee();
      } else if (answer.menu === "Update employee role") {
        updateEmployee();
      } else if (answer.menu === "View All roles") {
        viewRoles();
      } else if (answer.menu === "View All") {
        viewAll();
      } else if (answer.menu === "Add new role") {
        addRole();
      } else if (answer.menu === "Add new department") {
        addDept();
      } else {
        db.end();
      }
    });
}
// Adding a Department
function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "dept",
        message: "What department are you adding?",
      },
    ])
    .then((answer) => {
      db.query("INSERT INTO department SET ?", {
        name: answer.dept,
      });
      options();
    });
}
// Adding a Role
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What role are you adding?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for the role?",
      },
      {
        type: "input",
        name: "departmentId",
        message: "What is the department ID for the role?",
      },
    ])
    .then((answers) => {
      db.query("INSERT INTO role SET ?", {
        title: answers.title,
        salary: answers.salary,
        department_id: answers.departmentId,
      });
      options();
    });
}
// Adding an Employee to the table
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first",
        message: "What is the employees first name?",
      },
      {
        type: "input",
        name: "last",
        message: "What is the employees last name?",
      },
      {
        type: "input",
        name: "roleId",
        message: "What is the employees role ID?",
      },
      {
        type: "input",
        name: "managerId",
        message: "What is the employees manager ID?",
      },
    ])
    .then((answers) => {
      db.query("INSERT INTO employee SET ?", {
        first_name: answers.first,
        last_name: answers.last,
        role_id: answers.roleId,
        manager_id: answers.managerId,
      });
      options();
    });
}
// View all tables
function viewAll() {
  db.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      options();
    }
  );
}
// View all employees
function viewEmployees() {
  db.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    options();
  });
}
// View all deparments
function viewDepts() {
  db.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    options();
  });
}
// View all roles
function viewRoles() {
  db.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    options();
  });
}


// To add Employee
function updateEmployee() {
  inquirer.prompt([
    {
      type:'input',
      name:'employeeId',
      message:'What is the employees ID who is getting a new role?'
    },
    {
      type:'input',
      name:'roleId',
      message:'What is the role ID for the new role?'
    }
  ]).then(answers => {

    db.query('UPDATE employee SET ? WHERE ?', [
      {
        role_id: answers.roleId
      },
      {
        id: answers.employeeId
      }
    ])
    options()
  })
}
