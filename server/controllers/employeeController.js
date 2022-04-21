/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const db = require('../SQLDB');

const employeeController = {}

employeeController.findAllEmployees = async (req, res, next) => {

    const employeesQuery = `SELECT * FROM employees e
                            LEFT JOIN departments d ON d.department_id = e.department
                            LEFT JOIN roles r ON r.role_id = e.role
                            ORDER BY e.employee_id`

    const queryResult = await db.query(employeesQuery);
    res.locals.employees = queryResult.rows
    return next()
}

employeeController.createEmployee = async (req, res, next) => {
    const { first_name, last_name, department, role, email} = req.body

    const employeeQuery = `INSERT INTO employees (first_name, last_name, department, role, email)
                           VALUES ('${first_name}', '${last_name}', ${department}, ${role}, '${email}')`
    
    try {
        await db.query(employeeQuery)
        return next();
    }   
    catch(err) {
        return next({
            log: "Error in employeeController.createEmployee middleware",
            message: {err: err}
            })
    }
}

employeeController.updateEmployee = async (req, res, next) => {

    const updateObj = {...req.body}

    for (let key in updateObj) {
        if (key !== 'email') {
            const updateQuery = `UPDATE employees SET ${key} = '${updateObj[key]}' WHERE email = '${updateObj['email']}'`
            await db.query(updateQuery)   
        }
    }
    return next()
}

employeeController.deleteEmployee = (req, res, next) => {

    const {id} = req.params

    const deleteEmployeeQuery = `DELETE FROM employees WHERE employee_id = ${id}`
    // console.log(deleteEmployeeQuery)
    db.query(deleteEmployeeQuery)

    return next()
}


module.exports = employeeController;
