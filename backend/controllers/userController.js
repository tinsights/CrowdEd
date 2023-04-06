const ObjectId = require("mongodb").ObjectId;
const db = require("../config/MongoUtil");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { authenticateToken } = require("../middleware/authMiddleware");

function generateAccessToken(id, email) {
  return jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
}

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
  const { name, email, location, password } = payload;
  if (!name || !email || !location || !password) {
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
        name,
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
  const userId = req.params.id;
  db.get()
    .collection("users")
    .findOne({
      _id: new ObjectId(userId),
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
  if (!name || !email || !location) {
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
  try {
    const deleteUser = db.get().collection("users").deleteOne({
      _id: userIdToDelete,
    });
    const deleteSkills = db.get().collection("skills").deleteMany({ "user.userId": userIdToDelete });
    Promise.all([deleteUser, deleteSkills]).then((result) => res.status(200).json(result));
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
}

async function createSkillForUser(req, res) {
  const payload = req.body;
  console.log(payload);
  const { title, description, location } = payload;
  console.log(req.params.id);

  const userId = new ObjectId(req.params.id);

  if (!title || !description || !location) {
    res.status(400);
    throw new Error("Invalid Form");
  } else {
    // get the user details and store in variable
    const user = await db.get().collection("users").findOne({
      _id: userId,
    });

    // write to skills collection
    const newSkill = await db
      .get()
      .collection("skills")
      .insertOne({
        user: {
          userId,
          name: user.name,
          location,
        },
        title,
        description,
        location,
      });
    // update user with new skillid reference
    db.get()
      .collection("users")
      .findOneAndUpdate(
        { _id: userId },
        {
          $push: {
            skills: {
              _id: newSkill.insertedId,
              title,
              description,
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
            res.status(200).json({ ...newSkill, ...result });
            break;
        }
      });
  }
}

async function userLogin(req, res) {
  const payload = req.body;
  const { email, password } = payload;
  if (!email || !password) {
    res.status(400);
    throw new Error("Invalid Form");
  } else {
    const user = await db.get().collection("users").findOne({
      email,
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateAccessToken(user._id, user.email);
      res.cookie("access_token", token, { httpOnly: true });
      res.status(200).json({ ...user, token });
    } else {
      res.status(404);
      throw new Error("Invalid Credentials");
    }
  }
}

module.exports = {
  getUserById,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  createSkillForUser,
  userLogin,
};
