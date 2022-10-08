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

