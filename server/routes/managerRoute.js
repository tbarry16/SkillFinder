/* eslint-disable no-undef */
const express = require('express');
const departmentController = require('../controllers/departmentController');
const router = express.Router();

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
router.get('/skill', (req, res, next) => {
    return next();
})

/* Department Handling */

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

router.post('/role', roleController.addRole, (req, res, next) => {
    return next()
})

router.patch('/role', roleController.updateRole, (req, res, next) => {
    return next()
})

router.delete('/role/:name', roleController.deleteRole, (req, res, next) => {
    return next();
})





module.exports = router