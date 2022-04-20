/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const db = require('../SQLDB');

const employeeController = {}

employeeController.findAllEmployees = async (req, res, next) => {

    const employeesQuery = `SELECT * FROM employees e
                            LEFT JOIN departments d ON d.department_id = e.department
                            LEFT JOIN roles r ON r.role_id = e.role`

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

employeeController.updateEmployee = (req, res, next) => {

    const updateObj = {...req.body}
    // console.log(updateObj)

    let updateQuery = `UPDATE employees (`
    let valuesQuery = `VALUES (`

    for (let key in updateObj) {
        updateQuery +=  key + ', '
        valuesQuery += updateObj[key] + ', '
    }
    updateQuery = updateQuery.substring(0, updateQuery.length - 2) + ') '
    valuesQuery = valuesQuery.substring(0, valuesQuery.length - 2) + ')'
    const finalQuery = updateQuery + valuesQuery
    console.log(finalQuery)

    return next()
}

employeeController.deleteEmployee = (req, res, next) => {
    return next()
}


module.exports = employeeController;
