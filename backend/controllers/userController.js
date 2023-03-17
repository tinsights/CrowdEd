const jsonfile = require("jsonfile");
const { User, Skill } = require("../model/classes");

const usersFile = "./backend/public/data/users.json";
const skillsFile = "./backend/public/data/skills.json";

function getUsers(req, res) {
  jsonfile
    .readFile(usersFile)
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
    jsonfile
      .readFile(usersFile)
      .then((users) => {
        users.push(newUser);
        jsonfile.writeFile(usersFile, users, (err) => {
          if (err) {
            res.status(500);
            throw new Error(err);
          } else {
            switch (req.params.mode) {
              case "view":
                res.status(200).redirect("/view/users");
                break;
              case "api":
              default:
                res.status(200).json(users);
                break;
            }
          }
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}

function getUserById(req, res) {
  const userID = req.params.id;
  console.log(userID);
  jsonfile
    .readFile(usersFile)
    .then((users) => {
      const userToDisplay = users[users.findIndex((user) => user._id === userID)];
      switch (req.params.mode) {
        case "view":
          res.status(200).render("pages/user.ejs", {
            user: userToDisplay,
          });
          break;
        case "api":
        default:
          res.status(200).json(userToDisplay);
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
  const updatedUser = new User(name, email, location);
  jsonfile
    .readFile(usersFile)
    .then((users) => {
      const indexToUpdate = users.findIndex((user) => user._id === idToUpdate);
      const updatedUsers = [...users.slice(0, indexToUpdate), updatedUser, ...users.slice(indexToUpdate + 1)];
      jsonfile.writeFile(usersFile, updatedUsers, (err) => {
        if (err) {
          res.status(500);
          throw new Error(err);
        }
        res.status(200).json(updatedUsers);
      });
    })
    .catch((err) => {});
}

function deleteUser(req, res) {
  console.log("params id to delete", req.params.id);
  const idToDelete = req.params.id;
  jsonfile
    .readFile(usersFile)
    .then((users) => {
      const indexToDelete = users.findIndex((user) => user._id === idToDelete);
      const updatedUsers = [...users.slice(0, indexToDelete), ...users.slice(indexToDelete + 1)];
      jsonfile.writeFile(usersFile, updatedUsers, (err) => {
        if (err) {
          res.status(500);
          throw new Error(err);
        }
        res.status(200).json(updatedUsers);
      });
    })
    .catch((err) => {});
}

function createSkillForUser(req, res) {
  const payload = req.body;
  const { title, description } = payload;
  const userID = req.params.id;

  if (!title || !description) {
    res.status(400);
    throw new Error("Invalid Form");
  } else {
    const newSkill = new Skill(userID, title, description);
    jsonfile.readFile(skillsFile).then((skills) => {
      const updatedSkills = [...skills, newSkill];
      jsonfile.writeFile(skillsFile, updatedSkills, (err) => {
        if (err) {
          res.status(500);
          throw new Error(err);
        }
      });
    });
    // read users, create skills for user with :id
    jsonfile
      .readFile(usersFile)
      .then((users) => {
        const updatedUsers = users.slice();
        const indexToUpdate = updatedUsers.findIndex((user) => user._id === userID);
        updatedUsers[indexToUpdate].skills.push(newSkill);
        jsonfile.writeFile(usersFile, updatedUsers, (err) => {
          if (err) {
            res.status(500);
            throw new Error(err);
          }
          switch (req.params.mode) {
            case "view":
              res.status(200).redirect(`/view/users/${userID}`);
              break;
            case "api":
            default:
              res.status(200).json(updatedUsers[indexToUpdate]);
              break;
          }
        });
      })
      .catch((err) => {
        throw new Error(err);
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
