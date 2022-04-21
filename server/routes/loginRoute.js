/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController')

router.post('/', loginController.findUser, loginController.findUserRole, (req, res, next) => {
    return next()
})


module.exports = router;