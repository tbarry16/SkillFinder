/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const db = require('../SQLDB');
const bcrypt = require('bcrypt');

const signupController = {}

signupController.addUser = async (req, res, next) => {
    const { email, password } = req.body
    console.log(email, password)

    bcrypt.hash(password, 10, async (err, hash) => {
        if (err) console.log(err)
        console.log(hash)

        const addPasswordQuery = `UPDATE employees SET passhash = '${hash}' WHERE email = '${email}'`
        await db.query(addPasswordQuery)
        const findUserRole = `SELECT role FROM employees WHERE email = '${email}'`
        const queryRes = await db.query(findUserRole)
        res.locals.role = queryRes.rows[0].role
        return next()
    })

    
}



module.exports = signupController;