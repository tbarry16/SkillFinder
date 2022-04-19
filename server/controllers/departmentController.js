/* eslint-disable no-undef */
const db = require('../SQLDB');

const departmentController = {}

departmentController.addDepartment = async (req, res, next) => {

    const { name, description } = req.body;

    const departmentExistsQuery = `SELECT * FROM departments WHERE department_name = '${name}'`
    const addDepartmentQuery = `INSERT INTO departments (department_name, description) VALUES ('${name}', '${description}')`
     
    try {
        const departmentExists = await db.query(departmentExistsQuery)
        if (!departmentExists.rows.length) {
            await db.query(addDepartmentQuery)
            return next();
        } else {
            console.log(`Department already exists with department_id = ${departmentExists.rows[0].department_id}`)
            return next({
                log: "Error in departmentController.addDepartment middleware",
                message: {err: 'Department already exists!'}
            })
        }
    }
    catch (err) {
        return next({
            log: "Error in departmentController.addDepartment middleware",
            message: {err: err}
        })
    }
}

departmentController.updateDepartment = async (req, res, next) => {
    const { name, description } = req.body;

    const updateDepartmentQuery = `UPDATE departments SET description = '${description}' WHERE departments.department_name = '${name}';`
    
    try {
        await db.query(updateDepartmentQuery)
        return next();
    }
    catch (err) {
        return next({
            log: "Error in departmentController.updateDepartment middleware",
            message: {err: err}
        })
    }
}

departmentController.deleteDepartment = async (req, res, next) => {

    const { name } = req.params

    const departmentExistsQuery = `SELECT * FROM departments WHERE department_name = '${name}'`
    const deleteDepartmentQuery = `DELETE FROM departments WHERE department_name = '${name}'`

    try {
        const departmentExists = await db.query(departmentExistsQuery)
        if (departmentExists.rows.length) {
            await db.query(deleteDepartmentQuery);
            return next();
        } else {
            console.log(`There is no record of a department titled ${name}`)
            return next({
                log: "Error in departmentController.deleteDepartment middleware",
                message: {err: 'Department does not exist!'}
            })
        }
    }
    catch (err) {
        return next({
            log: "Error in departmentController.deleteDepartment middleware",
            message: {err: err}
        })
    }
}


module.exports = departmentController;