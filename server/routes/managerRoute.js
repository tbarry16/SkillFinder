/* eslint-disable no-undef */
const express = require('express');
const departmentController = require('../controllers/departmentController');
const router = express.Router();

const db = require('../SQLDB')

const employeeController = require('../controllers/employeeController');
const roleController = require('../controllers/roleController');
const skillController = require('../controllers/skillController')




router.get('/', (req, res, next) => {
    return next();
})

/* Employee Handling */
router.get('/employee', employeeController.findAllEmployees, (req, res, next) => {
    return next();
})

router.post('/employee', employeeController.createEmployee, skillController.addSkills, skillController.linkEmployeeWithSkills, (req, res, next) => {
    return next();
})

router.patch('/employee', employeeController.updateEmployee, (req, res, next) => {
    return next()
})

router.delete('/employee', employeeController.deleteEmployee, (req, res, next) => {
    return next()
})

/* Skill Handling without Employee first*/
router.post('/skill', skillController.addSkills, (req, res, next) => {
    return next();
})

router.delete('/skill/:name', skillController.deleteSkill, (req, res, next) => {
    return next();
})

/* Department Handling */
router.get('/department', departmentController.findDepartments, (req, res) => {
    return res.status(200).json(res.locals.departments)
})

router.post('/department', departmentController.addDepartment, (req, res, next) => {
    return next()
})

router.patch('/department', departmentController.updateDepartment, (req, res, next) => {
    return next()
})

router.delete('/department/:name', departmentController.deleteDepartment, (req, res, next) => {
    return next();
})

/* Role Handling */
router.get('/role', roleController.findRoles, (req, res) => {
    return res.status(200).json(res.locals.roles)
})

router.post('/role', roleController.addRole, (req, res, next) => {
    return next()
})

router.patch('/role', roleController.updateRole, (req, res, next) => {
    return next()
})

router.delete('/role/:name', roleController.deleteRole, (req, res, next) => {
    return next();
})

/* Reset Database Employees, Skills and Association Table in addition to Restarting the SERIAL for PRIMARY KEYS */
router.delete('/deleteAll', async (req, res) => {
    // ALTER SEQUENCE skills_skill_id_seq RESTART WITH 1

    const deleteQueries = ['employees', 'skills', 'employee_with_skill']
    const resetSeqQueries = ['employees_employee_id_seq', 'skills_skill_id_seq', 'employee_with_skill_primary_id_seq']

    for (let i = 0; i < deleteQueries.length; i++) {
        await db.query(`DELETE FROM ${deleteQueries[i]}`);
        await db.query(`ALTER SEQUENCE ${resetSeqQueries[i]} RESTART WITH 1`)
    }

    return res.status(200).send('Database Reset excluding departments and roles!')
})



module.exports = router