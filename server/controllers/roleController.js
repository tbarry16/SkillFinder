/* eslint-disable no-undef */
const db = require('../SQLDB');

const roleController = {}


roleController.addRole = async (req, res, next) => {

    const { name, description } = req.body;

    const roleExistsQuery = `SELECT * FROM roles WHERE role_name = '${name}'`
    const addRoleQuery = `INSERT INTO roles (role_name, description) VALUES ('${name}', '${description}')`
     
    try {
        const roleExists = await db.query(roleExistsQuery)
        if (!roleExists.rows.length) {
            await db.query(addRoleQuery)
            return next();
        } else {
            console.log(`Role already exists with role_id = ${roleExists.rows[0].role_id}`)
            return next({
                log: "Error in roleController.addRole middleware",
                message: {err: 'Role already exists!'}
            })
        }
    }
    catch (err) {
        return next({
            log: "Error in roleController.addRole middleware",
            message: {err: err}
        })
    }
    
}

roleController.updateRole = async (req, res, next) => {
    const { name, description } = req.body;

    const updateRoleQuery = `UPDATE roles SET description = '${description}' WHERE roles.role_name = '${name}';`
    
    try {
        await db.query(updateRoleQuery)
        return next();
    }
    catch (err) {
        return next({
            log: "Error in departmentController.updateDepartment middleware",
            message: {err: err}
        })
    }
}

roleController.deleteRole = async (req, res, next) => {
    const { name } = req.params;

    const roleExistsQuery = `SELECT * FROM roles WHERE role_name = '${name}'`
    const deleteRoleQuery = `DELETE FROM roles WHERE role_name = '${name}'`
     
    try {
        const roleExists = await db.query(roleExistsQuery)
        if (roleExists.rows.length) {
            await db.query(deleteRoleQuery)
            return next();
        } else {
            console.log(`There is no record of a role named ${name}`)
            return next({
                log: "Error in roleController.deleteRole middleware",
                message: {err: 'Role does not exist!'}
            })
        }
    }
    catch (err) {
        return next({
            log: "Error in roleController.deleteRole middleware",
            message: {err: err}
        })
    }
}

module.exports = roleController;