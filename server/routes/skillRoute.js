/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();

const skillController = require('../controllers/skillController')

router.get('/', skillController.findSkills, (req, res, next) => {
    return next();
})



module.exports = router;