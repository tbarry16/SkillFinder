/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();

const signupController = require('../controllers/signupController')

router.post('/', signupController.addUser, (req, res, next) => {
    return next()
})


module.exports = router;