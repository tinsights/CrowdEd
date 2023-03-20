const jsonfile = require("jsonfile");
const { User, Skill } = require("../model/classes");

const usersFile = "./backend/public/data/users.json";
const skillsFile = "./backend/public/data/skills.json";

function getSkills(req, res) {
  jsonfile
    .readFile(usersFile)
    .then((users) => {
      switch (req.params.mode) {
        case "view":
          res.status(200).render("pages/skills.ejs", { users });
          break;
        case "api":
        default:
          res.status(200).json(users);
          break;
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      throw new Error(err);
    });
}

function getSkillById(req, res) {
  const { userid, skillid } = req.params;
  jsonfile
    .readFile(usersFile)
    .then((users) => {
      const user = users[users.findIndex((u) => u._id === userid)];
      const skill = user.skills[user.skills.findIndex((s) => s._id === skillid)];
      switch (req.params.mode) {
        case "view":
          res.status(200).render("pages/skill.ejs", { user, skill });
          break;
        case "api":
        default:
          res.status(200).json({ skill });
          break;
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      throw new Error(err);
    });
}

module.exports = {
  getSkills,
  getSkillById,
};
