use employee_trackerDB;

INSERT INTO department (department_name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal"), ("Administration");

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2), ("Software Engineer", 120000, 2), 
("Sales Lead", 100000, 1), ("Salesperson", 80000, 1), 
("Legal Team Lead", 250000, 4), ("Lawyer", 190000, 4),
("Accountant", 125000, 3), ("CEO", 450000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 3, 8), ("Mike", "Chan", 4, 3), 
("Ashley", "Rodriguez", 1, 8), ("Kevin", "Tupik", 2, 1),
("Kunal", "Singh", 7, 8), ("Malia", "Brown", 5, 8),
("Sarah", "Lourd", 6, 5), ("Tom", "Allen", 8, null);