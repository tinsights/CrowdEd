const { json } = require("express");
const jsonfile = require("jsonfile");
const { User, Skill } = require("../classes");

function getUsers(req, res) {
  jsonfile
    .readFile("./backend/public/data/users.json")
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.log(err);
    });
}

async function addUser(req, res) {
  const payload = req.body;
  const { name, email, location, skills } = payload;
  console.log(payload);
  if (!name || !email || !location || !skills) {
    res.status(400);
    throw new Error("Invalid Form");
  } else {
    const newUser = new User(name, email, location, skills);
    jsonfile
      .readFile("./backend/public/data/users.json")
      .then((users) => {
        users.push(newUser);
        jsonfile.writeFile("./backend/public/data/users.json", users, (err) => {
          if (err) {
            console.log(err);
            res.status(500);
            throw new Error(err);
          }
          res.status(200).json(users);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function updateUser(req, res) {
  res.status(200).json({ message: `Update User ${req.params.id}` });
}

function deleteUser(req, res) {
  if (!req.params.id) {
    res.status(400);
    throw new Error("ID required");
  }
  const idToDelete = req.params.id;
  jsonfile
    .readFile("./backend/public/data/users.json")
    .then((users) => {
      const updatedUsers = users.filter((user) => user._id !== idToDelete);
      jsonfile.writeFile("./backend/public/data/users.json", updatedUsers, (err) => {
        if (err) {
          res.status(500);
          throw new Error(err);
        }
        res.status(200).json(updatedUsers);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};
