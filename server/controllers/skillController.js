const db = require('../SQLDB');

const skillController = {}

skillController.addSkills = (req, res, next) => {
    const skills = req.body.skills

    console.log(skills)

    return next();
}


module.exports = skillController;