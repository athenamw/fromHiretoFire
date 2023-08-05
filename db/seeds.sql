INSERT INTO department (name)
VALUES ('Intake'),
       ('Admitting'),
       ('Business Ops'),
       ('Social Services'),
       ('Utilization Review'),
       ('Performance Improvement'),
       ('Administration');

INSERT INTO role (title, salary, department_id)
VALUES ('Nurse', 118500, 1),
       ('Nurse', 118500, 2),
       ('Social Worker', 88000, 4),
       ('Intake Coordinator', 57000, 1),
       ('Psychiatrist', 250000, 4),
       ('Mental Health Tech', 60000, 2),
       ('Receptionist', 50000, 3),
       ('Director', 150000, 7),
       ('CEO', 300000, 7);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Jeff', 'Smith', 8, 5),
       ('Shana', 'Thomas', 2, 1),
       ('Marion', 'Johnson', 1, 1),
       ('Kara', 'Berg',3, 6),
       ('Melanie', 'Black', 9, NULL),
       ('Tony', 'Jacbos',8, 5),
       ('Joseph', 'Sampson', 5, 5),
       ('Louis', 'Vasquez', 6, 2),
       ('Hina', 'Kaur', 7, 6),
       ('Ally', 'Chan', 6, 2),
       ('Sineada', 'Charles', 3, 7),
       ('Amy', 'Fry', 7, 6);