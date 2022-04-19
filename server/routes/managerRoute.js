const express = require('express')
const router = express.Router();

const employeeController = require('../controllers/employeeController')
const skillController = require('../controllers/skillController')




router.get('/', (req, res, next) => {
    return next();
})

router.post('/', employeeController.createEmployee, skillController.addSkills, (req, res, next) => {
    return next();
})





module.exports = router