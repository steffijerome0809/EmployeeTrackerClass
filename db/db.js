const connection = require("./connection");
class DB {
  constructor() {
    this.connection = connection;
  }

  addtheDepartment(depname) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "insert into department(name) values (?)",
        depname,
        (err, data) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          resolve(data);
        }
      );
    });
  }

  viewEmpByDep(deptname) {
    return new Promise((resolve, reject) => {
      var query =
        "select em.first_name as firstname ,em.last_name as lastname from employee e join employee em on e.empid=em.manager_id";
      query +=
        " join role r on r.roleid=em.role_id join department d on d.id=r.department_id where d.name=?";
      console.log(query);
      this.connection.query(query, deptname, (err, data) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(data);
      });
    });
  }

  viewEmpByManager(managername) {
    return new Promise((resolve, reject) => {
      var query =
        "select em.first_name as firstname ,em.last_name as lastname, CONCAT(e.first_name,' ',e.last_name) as manager from employee e join employee em on e.empid=em.manager_id where e.first_name=?";
      console.log(query);
      this.connection.query(query, managername, (err, data) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(data);
      });
    });
  }

  addemployee(first_name, last_name) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "INSERT INTO employee (first_name,last_name) values(?,?)",
        [first_name, last_name],
        function (err, data) {
          if (err) {
            console.log(err);
            return reject(err);
          }
          resolve(data);
        }
      );
    });
  }

  addrole(title, salary, dept_id) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "INSERT INTO role (title,salary,department_id) values(?,?,?)",
        [title, salary, dept_id],
        function (err, data) {
          if (err) {
            console.log(err);
            return reject(err);
          }
          resolve(data);
        }
      );
    });
  }

  // select employee list
  emplist() {
    let allemp = [];
    return new Promise((resolve, reject) => {
      this.connection.query("SELECT * FROM employee", (err, data) => {
        // console.log(answer);
        for (let i = 0; i < data.length; i++) {
          let employeeString =
            data[i].empid + " " + data[i].first_name + " " + data[i].last_name;
          allemp.push(employeeString);
        }

        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(allemp);
      });
    });
  }

  // select department list
  deplist() {
    let alldep = [];
    return new Promise((resolve, reject) => {
      this.connection.query("SELECT * FROM department", (err, data) => {
        // console.log(answer);
        for (let i = 0; i < data.length; i++) {
          let departments = data[i].id + " " + data[i].name;
          alldep.push(departments);
        }

        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(alldep);
      });
    });
  }

  // select roles

  rolelist() {
    let allrole = [];
    return new Promise((resolve, reject) => {
      this.connection.query("SELECT * FROM role", (err, data) => {
        // console.log(answer);
        for (let i = 0; i < data.length; i++) {
          let roles = data[i].roleid + " " + data[i].title;
          allrole.push(roles);
        }

        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(allrole);
      });
    });
  }

  viewAllEmp() {
    var query =
      "select em.first_name as firstname ,em.last_name as lastname,r.title,r.salary,d.name,";
    query +=
      'concat(e.first_name," ",e.last_name) as manager from employee e join employee em on e.empid=em.manager_id';
    query +=
      " join role r on r.roleid=em.role_id join department d on d.id=r.department_id";
    //console.log(query);
    return new Promise((resolve, reject) => {
      this.connection.query(query, (err, data) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(data);
      });
    });
  }

  /// update functions

  upd_role(role_id, emp_id) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "UPDATE employee SET role_id = ? WHERE empid = ?",
        [role_id, emp_id],
        function (err, data) {
          if (err) {
            console.log(err);
            return reject(err);
          }
          resolve(data);
        }
      );
    });
  }

  upd_manager(emp_id, manager_id) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "UPDATE employee SET manager_id = ? WHERE empid = ?",
        [manager_id, emp_id],
        function (err, data) {
          if (err) {
            console.log(err);
            return reject(err);
          }
          resolve(data);
        }
      );
    });
  }

  // remove emp
  rem_emp(emp_id) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "Delete from employee WHERE empid = ?",
        emp_id,
        function (err, data) {
          if (err) {
            console.log(err);
            return reject(err);
          }
          resolve(data);
        }
      );
    });
  }
}

module.exports = DB;
