const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// Database connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_trackerDB"
});

connection.connect(function (err) {
    if (err) throw err;
    mainMenu();
})

function mainMenu() {
    inquirer.prompt({
        type: "list",
        name: "mainMenu",
        message: "What is your query?",
        choices: [
            "View All Employees",
            "View All Departments",
            "View All Roles",
            "Add Employee",
            "Add Department",
            "Add Role",
            "Update Employee Role",
            "Quit"
        ]
    })
        .then(function (answer) {
            switch (answer.mainMenu) {
                case "View All Employees":
                    viewAllEmployees();
                    break;

                case "View All Departments":
                    viewAllDepartments();
                    break;

                case "View All Roles":
                    viewAllRoles();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Add Department":
                    addDepartment();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "Update Employee Role":
                    updateEmployeeRole();
                    break;

                case "Quit":
                    quit();
                    break;
            }
        });
}

function viewAllEmployees() {
    var userInput = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id"
    connection.userInput(userInput, function (err, res) {
        if (err) {
            throw err;
        }
        console.table(res);
        mainMenu();
    });
}

function viewAllDepartments() {
    var userInput = "SELECT * FROM department"
    connection.userInput(userInput, function (err, res) {
        if (err) {
            throw err;
        }
        console.table(res);
        mainMenu();
    });
}

function viewAllRoles() {
    var userInput = "SELECT * FROM role"
    connection.userInput(userInput, function (err, res) {
        if (err) {
            throw err;
        }
        console.table(res);
        mainMenu();
    });
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name",
            name: "firstName"
        },
        {
            type: "input",
            message: "What is the employee's last name",
            name: "lastName"
        },
        {
            type: "input",
            message: "What is the employee's role ID",
            name: "addEmployeeRole"
        },
        {
            type: "input",
            message: "What is the employee's manager ID",
            name: "addDirectMgr"
        }
    ])
        .then(function (res) {
            const firstName = res.firstName;
            const lastName = res.lastName;
            const eeRoleID = res.addEmployeeRole;
            const eeMgrID = res.addDirectMgr;
            const userInput = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${eeRoleID}", "${eeMgrID}")`;
            connection.userInput(userInput, function (err, res) {
                if (err) {
                    throw err;
                }
                console.table(res);
                mainMenu();
            });
        });
}

function addDepartment() {
    inquirer.prompt({
        type: "input",
        message: "What is the new department called?",
        name: "newDepartment"
    })
        .then(function (res) {
            const newDepartment = res.newDepartment;
            const userInput = `INSERT INTO department (department_name) VALUES ("${newDepartment}")`;
            connection.userInput(userInput, function (err, res) {
                if (err) {
                    throw err;
                }
                console.table(res);
                mainMenu();
            });
        });
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the position title?",
            name: "positionTitle"
        },
        {
            type: "input",
            message: "What is the salary for the position?",
            name: "positionSalary"
        },
        {
            type: "input",
            message: "What is the position's department ID?",
            name: "positionDeptID"
        },
    ])
    .then(function (res) {
        const positionTitle = res.positionTitle;
        const salary = res.positionSalary;
        const positionDeptID = res.positionDeptID;
        const userInput = `INSERT INTO role (title, salary, department_id) VALUES ("${positionTitle}", "${salary}", "${positionDeptID}")`;
        connection.userInput(userInput, function (err, res) {
            if (err) {
                throw err;
            }
            console.table(res);
            mainMenu();
        });
    });
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is employee's ID to be updated?",
            name: "updateEE"
        },
        {
            type: "input",
            message: "What is the role ID of the employee's new role?",
            name: "roleChange"
        },
    ])
    .then(function (res) {
        const updateEE = res.updateEE;
        const roleChange = res.roleChange;
        const userInput = `UPDATE employee SET role_id = "${roleChange}" WHERE id = "${updateEE}"`;
        connection.userInput(userInput, function (err, res) {
            if (err) {
                throw err;
            }
            console.table(res);
            mainMenu();
        });
    });
}