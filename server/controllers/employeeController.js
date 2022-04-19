const db = require('../SQLDB');

const employeeController = {}

employeeController.createEmployee = (req, res, next) => {
    console.log('got to controller')
    const { first_name, last_name, department_id, role_id, email} = req.body

    const employeeQuery = `INSERT INTO employees (first_name, last_name, department_id, role_id, email)
                           VALUES ('${first_name}', '${last_name}', '${department_id}', '${role_id}', '${email}')`

        db.query(employeeQuery)
          .then(resp => {
              return next()
          })
          .catch(err => {
              return next({
                  log: "Error in employeeController.createEmployee middleware",
                  message: {err: err}
              })
          })
}


module.exports = employeeController;
