INSERT INTO department (name)
VALUES ('Intake'),
       ('Admitting'),
       ('Business Ops'),
       ('Social Services'),
       ('Utilization Review'),
       ('Performance Improvement')
       ('Administration');

INSERT INTO role (id, title, salary)
VALUES (1, 'Nurse', 118500),
       (2, 'Social Worker', 88000),
       (3, 'Intake Coordinator', 57000 ),
       (4, 'Psychiatrist', 250000),
       (5, 'Mental Health Tech', 60000),
       (6, 'Receptionist', 50000),
       (7, 'Director', 150000)
       (8, 'CEO', 300000);

INSERT INTO employee(id, first_name, last_name, manager_id)
VALUES (1, 'Jeff', 'Smith', 'Melanie Black'),
       (2, 'Shana', 'Thomas', 'Joseph Sampson'),
       (3, 'Marion', 'Johnson', 'Jeff Smith'),
       (4, 'Kara', 'Berg', 'Tony Jacobs'),
       (5, 'Melanie', 'Black', ''),
       (6, 'Tony', 'Jacbos', 'Melanie Black'),
       (7, 'Joseph', 'Sampson', 'Melanie Black'),
       (8, 'Louis', 'Vasquez', 'Shana Thomas'),
       (9, 'Hina', 'Kaur', 'Tony Jacobs'),
       (10, 'Ally', 'Chan', 'Todd Banks'),
       (11, 'Sineada', 'Charles', 'Joseph Sampson'),
       (12, 'Amy', 'Fry', 'Jeff Smith');