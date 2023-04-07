const ObjectId = require("mongodb").ObjectId;
const db = require("../config/MongoUtil");

async function getSkillsForUser(req, res) {
  // get all skills for a user
  const userId = new ObjectId(req.params.userId);
  db.get()
    .collection("users")
    .findOne({
      _id: userId,
    })
    .then((result) => {
      console.log(result);
      res.status(200).json(result.skills);
    })
    .catch((err) => {
      res.status(500);
      throw new Error(err);
    });
}

async function createSkillForUser(req, res) {
  const payload = req.body;
  console.log(payload);
  const { title, description } = payload;
  console.log(req.params.userId);

  const userId = new ObjectId(req.params.userId);

  if (!title || !description || category) {
    res.status(400);
    throw new Error("Invalid Form");
  } else {
    // update user with new skillid reference
    db.get()
      .collection("users")
      .findOneAndUpdate(
        { _id: userId },
        {
          $push: {
            skills: {
              _id: new ObjectId(),
              title,
              description,
              category,
            },
          },
        },
        {
          returnDocument: "after",
        }
      )
      .then((result) => {
        switch (req.params.mode) {
          case "view":
            res.status(200).render("pages/user.ejs", {
              user: result.value,
            });
            break;
          case "api":
          default:
            res.status(200).json(result.value);
            break;
        }
      });
  }
}

function getSkillById(req, res) {
  const { userId, skillId } = req.params;
  db.get()
    .collection("users")
    .findOne(
      {
        _id: new ObjectId(userId),
      },
      {
        projection: {
          skills: {
            $elemMatch: {
              _id: new ObjectId(skillId),
            },
          },
        },
      }
    )
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      throw new Error(err);
    });
}

// update skill via http put
function updateSkill(req, res) {
  const payload = req.body;
  const { title, description } = payload;
  if (!title || !description) {
    res.status(400);
    throw new Error("Invalid Form");
  }
  const { userId, skillId } = req.params;
  // update skill embdedded document
  db.get()
    .collection("users")
    .findOneAndUpdate(
      {
        _id: new ObjectId(userId),
        "skills._id": new ObjectId(skillId),
      },
      {
        $set: {
          "skills.$.title": title,
          "skills.$.description": description,
        },
      },
      {
        returnDocument: "after",
      }
    )
    .then((result) => {
      console.log(result);
      switch (req.params.mode) {
        case "view":
          res.status(200).render("pages/skill.ejs", {
            skill: result,
          });
          break;
        case "api":
        default:
          res.status(200).json(result);
          break;
      }
    })
    .catch((err) => {
      res.status(500);
      throw new Error(err);
    });
}

function deleteSkill(req, res) {
  console.log("delete skills");
  const { userId, skillId } = req.params;
  db.get()
    .collection("users")
    .findOneAndUpdate(
      { _id: new ObjectId(userId) },
      {
        $pull: {
          skills: {
            _id: new ObjectId(skillId),
          },
        },
      },
      {
        returnDocument: "after",
      }
    )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500);
      throw new Error(err);
    });
}

// create a review for a skill
// async function createReview(req, res) {
//   const { skillid } = req.params;
//   const { reviewerId, reviewText, rating } = req.body;
//   // get user name from id
//   const reviewer = await db
//     .get()
//     .collection("users")
//     .findOne({ _id: new ObjectId(reviewerId) });

//   // add review to skill
//   db.get()
//     .collection("users")
//     .updateOne(
//       { _id: new ObjectId(skillid) },
//       {
//         $push: {
//           reviews: {
//             reviewerId,
//             reviewerName: reviewer.name,
//             reviewText,
//             rating,
//           },
//         },
//       }
//     )
//     .then((result) => {
//       console.log(result);
//       res.status(200).json(result);
//     });
// }

module.exports = {
  getSkillsForUser,
  createSkillForUser,
  getSkillById,
  updateSkill,
  deleteSkill,
};
