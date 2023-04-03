const ObjectId = require("mongodb").ObjectId;
const db = require("../config/MongoUtil");

function getSkills(req, res) {
  db.get()
    .collection("skills")
    .find({})
    .toArray()
    .then((skills) => {
      switch (req.params.mode) {
        case "view":
          res.status(200).render("pages/skills.ejs", {
            skills,
          });
          break;
        case "api":
        default:
          res.status(200).json(skills);
          break;
      }
    })
    .catch((err) => {
      res.status(500);
      throw new Error(err);
    });
}

function getSkillById(req, res) {
  const { skillid } = req.params;
  db.get()
    .collection("skills")
    .findOne({ _id: new ObjectId(skillid) })
    .then((skill) => {
      switch (req.params.mode) {
        case "view":
          res.status(200).render("pages/skill.ejs", { skill });
          break;
        case "api":
        default:
          res.status(200).json(skill);
          break;
      }
    })

    .catch((err) => {
      console.log(err);
      res.status(500);
      throw new Error(err);
    });
}

// create a review for a skill
function createReview(req, res) {
  const { skillid } = req.params;
  const { reviewerId, reviewText, rating } = req.body;
  // assume skill exists, assume user exists
  // add review to skill
  db.get()
    .collection("skills")
    .updateOne(
      { _id: new ObjectId(skillid) },
      {
        $push: {
          reviews: {
            reviewerId,
            reviewText,
            rating,
          },
        },
      }
    )
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    });
}

module.exports = {
  getSkills,
  getSkillById,
  createReview,
};
