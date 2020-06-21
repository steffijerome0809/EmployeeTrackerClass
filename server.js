const inquirer = require("inquirer");
const DB = require("./db/db");
// const connection = require("./db/db.js");
// const mysql = require("mysql");

const database = new DB();

const startQue = () => {
  inquirer
    .prompt({
      type: "list",
      name: "questions",
      message: "What would you like to do ?",
      choices: [
        "add department",
        "add role",
        "add employee",
        "view all employees by department",
        "view all employees by manager",
        "view all employees",
        "update employee role",
        "update employee manager",
        "remove employee",
      ],
    })
    .then((answers) => {
      console.log("check +", answers);
      // start of switch statements

      switch (answers.questions) {
        case "add department":
          addDepartment();
          break;
        case "add role":
          addRole();
          break;
        case "add employee":
          addEmployee();
          break;
        case "view all employees":
          view_all_emp();
          break;
        case "view all employees by department":
          view_emp_by_dep();
          break;
        case "view all employees by manager":
          view_emp_by_manager();
          break;
        case "update employee role":
          upd_emp_role();
          break;
        case "update employee manager":
          upd_emp_manager();
          break;
        case "remove employee":
          remove_emp();
          break;
      }
    });
};
// Adding department

const addDepartment = () => {
  inquirer
    .prompt({
      type: "input",
      name: "depname",
      message: "Enter Department Name",
    })
    .then(async (answers) => {
      console.log(answers.depname);
      await database.addtheDepartment(answers.depname).then((response) => {
        console.table(response);
      });
      startQue();
    });
};

function view_emp_by_dep() {
  //   select e.first_name as firstname ,e.last_name as lastname from employee e ,role r join department d on r.department_id=d.id where d.name="Sales";
  inquirer
    .prompt({
      type: "list",
      name: "departmentname",
      message: "Which department employees do you want to view ?",
      choices: ["Management", "Legal", "Sales", "Engineering", "Finance"],
    })
    .then(async (answers) => {
      await database.viewEmpByDep(answers.departmentname).then((response) => {
        console.table(response);
      });

      startQue();
    });
}

function view_emp_by_manager() {
  inquirer
    .prompt({
      type: "input",
      name: "managername",
      message: "Name the manager whose employees you want to view ?",
    })
    .then(async (answers) => {
      await database.viewEmpByManager(answers.managername).then((response) => {
        console.table(response);
      });

      startQue();
    });
}

const view_all_emp = async () => {
  await database.viewAllEmp().then((response) => {
    console.table(response);
  });

  startQue();
};

const upd_emp_role = async () => {
  let allemp = [];
  let role = [
    "Sales Lead",
    "Sales person",
    "Lead Engineer",
    "Software Engineer",
    "Account Manager",
    "Accountant",
    "Legal Team Lead",
    "Lawyer",
  ];

  await database.emplist().then(async (response) => {
    console.log(response.length);
    for (let i = 0; i < response.length; i++) {
      allemp.push(response[i]);
    }
  });

  //console.log(allemp)

  inquirer
    .prompt([
      {
        type: "list",
        name: "updateEmpRole",
        message: "select employee to update role",
        choices: allemp,
      },
      {
        type: "list",
        message: "select new role",
        choices: role,
        name: "newrole",
      },
    ])
    .then(async (answers) => {
      console.log("about to update", answers);
      const idToUpdate = {};
      idToUpdate.employeeId = parseInt(answers.updateEmpRole.split(" ")[0]);
      // console.log(idToUpdate);

      switch (answers.newrole) {
        case "Sales Lead":
          idToUpdate.role_id = 1;
          break;
        case "Sales person":
          idToUpdate.role_id = 2;
          break;
        case "Lawyer":
          idToUpdate.role_id = 3;
          break;
        case "Lead Engineer":
          idToUpdate.role_id = 4;
          break;
        case "Software Engineer":
          idToUpdate.role_id = 5;
          break;
        case "Account Manager":
          idToUpdate.role_id = 6;
          break;
        case "Accountant":
          idToUpdate.role_id = 7;
          break;
        case "Legal Team Lead":
          idToUpdate.role_id = 8;
          break;
      }
      console.log(answers.newrole);
      console.log(idToUpdate.role_id, "+", idToUpdate.employeeId);

      await database
        .upd_role(idToUpdate.role_id, idToUpdate.employeeId)
        .then((response) => {
          console.table(response);
        });

      startQue();
    });
};

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter employee title",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter employee salary",
      },
      {
        type: "input",
        name: "department_id",
        message: "Enter employee department id",
      },
    ])
    .then(async (answers) => {
      await database
        .addrole(answers.title, answers.salary, answers.department_id)
        .then((response) => {
          console.table(response);
        });
      startQue();
    });
}
const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter employee first name",
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter employee last name",
      },
    ])
    .then(async (answers) => {
      await database
        .addemployee(answers.first_name, answers.last_name)
        .then((response) => {
          console.table(response);
        });

      startQue();
    });
};

// function upd_emp_manager() {
//   let allemp = [];
//   connection.query("SELECT * FROM employee", function (err, answer) {
//     for (let i = 0; i < answer.length; i++) {
//       let employeeString =
//         answer[i].empid +
//         " " +
//         answer[i].first_name +
//         " " +
//         answer[i].last_name;
//       allemp.push(employeeString);
//     }
//     // console.log(allemp)

//     inquirer
//       .prompt([
//         {
//           type: "list",
//           name: "updateempManager",
//           message: "select employee to update manager",
//           choices: allemp,
//         },
//         {
//           type: "list",
//           message: "select new manager",
//           choices: allemp,
//           name: "newManager",
//         },
//       ])
//       .then(function (answers) {
//         console.log("about to update", answers);
//         const idToUpdate = {};
//         idToUpdate.employeeId = parseInt(
//           answers.updateempManager.split(" ")[0]
//         );
//         //console.log(idToUpdate.employeeId);

//         idToUpdate.managerId = parseInt(answers.newManager.split(" ")[0]);

//         //console.log(idToUpdate.managerId);

//         connection.query(
//           "UPDATE employee SET manager_id= ? WHERE empid = ?",
//           [idToUpdate.managerId, idToUpdate.employeeId],
//           function (err, result) {
//             if (err) throw err;
//             console.table(result);
//           }
//         );
//         startQue();
//       });
//   });
// }

// function remove_emp() {
//   let allemp = [];

//   connection.query("SELECT * FROM employee", function (err, answer) {
//     for (let i = 0; i < answer.length; i++) {
//       let employeeString =
//         answer[i].empid +
//         " " +
//         answer[i].first_name +
//         " " +
//         answer[i].last_name;
//       allemp.push(employeeString);
//     }
//     // console.log(allemp)

//     inquirer
//       .prompt([
//         {
//           type: "list",
//           name: "removeEmp",
//           message: "select employee that you want to remove ",
//           choices: allemp,
//         },
//       ])
//       .then(function (answers) {
//         console.log("about to delete", answers);
//         const idToRemove = {};
//         idToRemove.employeeId = parseInt(answers.removeEmp.split(" ")[0]);
//         console.log(idToRemove.employeeId);

//         connection.query(
//           "DELETE FROM employee  WHERE empid = ?",
//           [idToRemove.employeeId],
//           function (err, result) {
//             if (err) throw err;
//             console.table(result);
//           }
//         );
//         startQue();
//       });
//   });
// }

// start function call
startQue();
