INSERT INTO department (name)
VALUES 
("Human Resources"),
("Operations Management"),
("Marketing"),
("R&D Deparment");



INSERT INTO role (title, salary, department_id)
VALUES 
("Marketing Analyst", 90000, 3),
("Lead Engineer", 150000, 4),
("Quality control", 120000, 2),
("Account Manager", 160000, 2),
("Product Designer", 100000, 4);





INSERT INTO employee (first_name, last_name, role_id, manager_id )
VALUES 
("Michael", "Weston", 1, NULL),
("Ash", "Ketchum", 2, 1),
 ("Charlie", "Brown", 3, 1),
 ("Bart", "Simpson", 4, 1),
 ("Eric", "Cartman", 5, 1),
 ("George", "Jetson", 2, 1),
 ("Bruce", "Wayne", 4, 1);