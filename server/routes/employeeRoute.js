/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
const departmentController = require('../controllers/departmentController');
const router = express.Router();

const db = require('../SQLDB')





router.get('/', (req, res, next) => {
    return next();
})


module.exports = router;