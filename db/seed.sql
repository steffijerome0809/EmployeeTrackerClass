DROP DATABASE IF EXISTS Employee_Tracker;
CREATE database Employee_Tracker;

USE Employee_Tracker;

create table department(id integer auto_increment not null,name varchar(50),primary key(id));

create table role(roleid integer auto_increment not null,
 title varchar(50) not null,
 salary decimal , department_id int not null, primary key(roleid),
 foreign key(department_id) references department(id));

create table employee(empid integer not null auto_increment,first_name varchar(50) not null,last_name varchar(50) not null,role_id int not null ,manager_id integer, primary key (empid),foreign key(role_id) references role(roleid),foreign key(manager_id) references employee(empid));


INSERT INTO department (name)
VALUES 
    ("Management"),
    ("legal");

INSERT INTO role (title, salary, department_id)
VALUES 
    ("manager", 100000,1 ),
    ("employee", 150000,2);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Daphne", "Moon",1,NULL);
    

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Doe",2,1);