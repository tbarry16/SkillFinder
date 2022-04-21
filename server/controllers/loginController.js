/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const db = require('../SQLDB');
const bcrypt = require('bcrypt');

const loginController = {};

loginController.findUser = async (req, res, next) => {

    const { email, password } = req.body

    const findHashPassQuery = `SELECT passhash FROM employees WHERE email = '${email}'`
    const queryRes = await db.query(findHashPassQuery)
    const hashPass = queryRes.rows[0].passhash;

    const myObj = {};

    bcrypt.compare(password, hashPass, (err, result) => {
        if (err) {
            return next({
                log: 'Error in loginControll.findUser bcrypt.compare',
                message: {err: err}
            })
        }

        res.locals.isUser = result;
        return next();
    })
}

loginController.findUserRole = async (req, res, next) => {
    const { email } = req.body

    if (res.locals.isUser) {
        const findUserRole = `SELECT role FROM employees WHERE email = '${email}'`
        const queryRes = await db.query(findUserRole)
        res.locals.role = queryRes.rows[0].role;
    }
    
    return next()
}

module.exports = loginController;