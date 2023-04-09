const ObjectId = require("mongodb").ObjectId;
const db = require("../config/MongoUtil");
const bcrypt = require("bcryptjs");
const { authenticateToken } = require("../middleware/authMiddleware");

async function getAllUsers(req, res) {
  console.log("getting all users");
  db.get()
    .collection("users")
    .find({}, { password: 0 })
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
          console.log(users);
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
  const { username, email, location, password } = payload;
  if (!username || !email || !location || !password) {
    res.status(400);
    throw new Error("Invalid Form");
  } else {
    // generate a salt
    const salt = bcrypt.genSaltSync(10);
    // hash password
    const hashedPassword = bcrypt.hashSync(password, salt);

    db.get()
      .collection("users")
      .insertOne({
        username,
        email,
        location,
        password: hashedPassword,
      })
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
  console.log("getting user by id: " + req.params.id);
  const userId = req.params.id;
  db.get()
    .collection("users")
    .findOne(
      {
        _id: new ObjectId(userId),
      },
      {
        projection: { password: 0 },
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

function updateUser(req, res) {
  const payload = req.body;
  const { username, email, location } = payload;
  if (!username || !email || !location) {
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
          username,
          email,
          location,
        },
      }
    )
    .then((result) => {
      console.log(result);
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
  db.get()
    .collection("users")
    .deleteOne({
      _id: userIdToDelete,
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      res.status(500);
      throw new Error(err);
    });
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
