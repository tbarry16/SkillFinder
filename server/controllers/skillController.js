/* eslint-disable no-undef */
const db = require('../SQLDB');

const skillController = {}

skillController.addSkills = async (req, res, next) => {
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
    const skill = req.params.skill
}


module.exports = skillController;