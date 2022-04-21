/* eslint-disable no-undef */
const db = require('../SQLDB');

const skillController = {}

skillController.findSkills = async (req, res, next) => {

    const skillsQuery = 'SELECT skill_name, description FROM skills'
    const queryResult = await db.query(skillsQuery)
    res.locals.skills = queryResult.rows.reduce((acc, el) => {
        acc.push(el['skill_name'])
        return acc;
    }, [])
    res.locals.description = queryResult.rows.reduce((acc, el) => {
        acc.push(el['description'])
        return acc;
    }, [])
    return next();
}

skillController.findEmployeesWithSkill = async (req, res, next) => {

    const skill = req.params.skill

    const skillExistsQuery = `SELECT * FROM skills WHERE skill_name = '${skill}'`
    const skillExistsResult =await  db.query(skillExistsQuery)
    if (skillExistsResult.rows.length === 0) {
        return next({
            log: 'Error in skillController.findEmployeesWithSkill',
            message: {err: 'There is no such skill stored in the database. Please reference the stored skills table and try again!'}
        })
    }
    const skill_id = skillExistsResult.rows[0].skill_id

    const findEmployeesQuery = `SELECT e.first_name, e.last_name, e.email 
                                FROM employees e
                                INNER JOIN employee_with_skill ews ON ews.employee = e.employee_id
                                WHERE ews.skill = ${skill_id}`

                                // LEFT JOIN employee_with_skill ews ON ews.employee = e.employee_id

    const foundEmployees = await db.query(findEmployeesQuery)

    res.locals.foundEmployeesArray = foundEmployees.rows
    return next()
}

skillController.addSkills = async (req, res, next) => {
    console.log('in add skills')
    const { skills, skill_descriptions } = req.body

    if (skills) {
        for (let i = 0; i < skills.length; i++) {

            const skillExistsQuery = `SELECT * FROM skills WHERE skill_name = '${skills[i]}'`
            const addSkillQuery = `INSERT INTO skills (skill_name, description) VALUES ('${skills[i]}', '${skill_descriptions[i]}')`
     
            try {
                const skillExists = await db.query(skillExistsQuery)
                if (!skillExists.rows.length) {
                    await db.query(addSkillQuery)
                } else (console.log('skill already exists!'))
            }
            catch (err) {
                return next({
                    log: "Error in skillController.addSkills middleware",
                    message: {err: err}
                })
            }
        }
    }
    return next();
}

skillController.linkEmployeeWithSkills = async (req, res, next) => {
    const { skills, email } = req.body
    const employee = await db.query(`SELECT * FROM employees WHERE email = '${email}'`);
    const employeeID  = employee.rows[0].employee_id

    if (skills) {
        for (let i = 0; i < skills.length; i++) {
        
            const findSkillIdQuery = `SELECT skill_id FROM skills WHERE skill_name = '${skills[i]}'`
            const queryResult = await db.query(findSkillIdQuery);
            const skillId = queryResult.rows[0].skill_id

            const linkEmployeeWithSkillQuery = `INSERT INTO employee_with_skill (employee, skill) VALUES (${employeeID}, ${skillId})`
            await db.query(linkEmployeeWithSkillQuery)
        }
    }  
    return next();
}

skillController.deleteSkill = async (req, res, next) => {
    const skill = req.params.name;

    const deleteQuery = `DELETE FROM skills WHERE skill_name = '${skill}'`
    await db.query(deleteQuery);
    
    return next()
}


module.exports = skillController;