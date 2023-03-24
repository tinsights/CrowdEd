const { User, Skill } = require("../model/classes");
const ObjectId = require("mongodb").ObjectId;
const db = require("../config/MongoUtil");

const usersFile = "./backend/public/data/users.json";
const skillsFile = "./backend/public/data/skills.json";

async function getUsers(req, res) {
  db.get()
    .collection("users")
    .find({})
    .toArray()
    .then((users) => {
      switch (req.params.mode) {
        case "view":
          res.status(200).render("pages/users.ejs", {
            users,
          });
          break;
        case "api":
        default:
          res.status(200).json(users);
          break;
      }
    })
    .catch((err) => {
      res.status(500);
      throw new Error(err);
    });
}

function addUser(req, res) {
  const payload = req.body;
  const { name, email, location } = payload;
  if (!name || !email || !location) {
    res.status(400);
    throw new Error("Invalid Form");
  } else {
    const newUser = new User(name, email, location);
    db.get()
      .collection("users")
      .insertOne(newUser)
      .then((result) => {
        switch (req.params.mode) {
          case "view":
            res.status(200).redirect("/view/users");
            break;
          case "api":
          default:
            res.status(200).json(result);
            break;
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}

function getUserById(req, res) {
  const userID = req.params.id;
  db.get()
    .collection("users")
    .findOne({
      _id: new ObjectId(userID),
    })
    .then((result) => {
      switch (req.params.mode) {
        case "view":
          res.status(200).render("pages/user.ejs", {
            user: result,
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

function updateUser(req, res) {
  const payload = req.body;
  const { name, email, location } = payload;
  if (!name || !email || !location || !skills) {
    res.status(400);
    throw new Error("Invalid Form");
  }
  const idToUpdate = req.params.id;
  db.get()
    .collection("users")
    .updateOne(
      {
        _id: new ObjectId(idToUpdate),
      },
      {
        $set: {
          name,
          email,
          location,
          skills,
        },
      }
    )
    .then((result) => {
      switch (req.params.mode) {
        case "view":
          res.status(200).render("pages/user.ejs", {
            user: result,
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

function deleteUser(req, res) {
  const userIdToDelete = new ObjectId(req.params.id);
  try {
    const deleteUser = db.get().collection("users").deleteOne({
      _id: userIdToDelete,
    });
    const deleteSkills = db.get().collection("skills").deleteMany({
      userID: userIdToDelete,
    });
    Promise.all([deleteUser, deleteSkills]).then((result) => res.status(200).json(result));
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
}

async function createSkillForUser(req, res) {
  const payload = req.body;
  const { title, description } = payload;
  const userID = new ObjectId(req.params.id);

  if (!title || !description) {
    res.status(400);
    throw new Error("Invalid Form");
  } else {
    // get the user details and store in variable
    const user = await db.get().collection("users").findOne({
      _id: userID,
    });

    // write to skills collection
    const newSkill = await db.get().collection("skills").insertOne({
      userID,
      teacherName: user.name,
      title,
      description,
    });
    // update user with new skillid reference
    db.get()
      .collection("users")
      .findOneAndUpdate(
        { _id: userID },
        {
          $push: {
            skills: {
              _id: newSkill.insertedId,
              title: title,
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
            res.status(200).json(result);
            break;
        }
      });
  }
}

module.exports = {
  getUserById,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  createSkillForUser,
};
