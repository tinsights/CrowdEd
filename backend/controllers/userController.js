const jsonfile = require("jsonfile");
const { User } = require("../model/classes");

const usersFile = "./backend/public/data/users.json";

function getUsers(req, res) {
  jsonfile
    .readFile(usersFile)
    .then((users) => res.status(200).json(users))
    .catch((err) => {
      console.log(err);
      res.status(500);
      throw new Error(err);
    });
}

function getUserById(req, res) {
  if (!req.params.id) {
    res.status(400);
    throw new Error("ID required");
  }
  const userID = req.params.id;
  console.log(userID);
  jsonfile
    .readFile(usersFile)
    .then((users) => {
      const userToDisplay = users[users.findIndex((user) => user._id === userID)];
      res.status(200).json(userToDisplay);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      throw new Error(err);
    });
}

function addUser(req, res) {
  const payload = req.body;
  const { name, email, location, skill } = payload;
  console.log(payload);
  if (!name || !email || !location || !skill) {
    res.status(400);
    throw new Error("Invalid Form");
  } else {
    const newUser = new User(name, email, location, skill);
    jsonfile
      .readFile(usersFile)
      .then((users) => {
        users.push(newUser);
        jsonfile.writeFile(usersFile, users, (err) => {
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
  if (!req.params.id) {
    res.status(400);
    throw new Error("ID required");
  }
  const payload = req.body;
  const { name, email, location, skill } = payload;
  console.log(payload);
  if (!name || !email || !location || !skill) {
    res.status(400);
    throw new Error("Invalid Form");
  }
  const idToUpdate = req.params.id;
  const updatedUser = new User(name, email, location, skill);
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
    .catch((err) => {
      console.log(err);
    });
  // res.status(200).json({ message: `Update User ${req.params.id}` });
}

function deleteUser(req, res) {
  if (!req.params.id) {
    res.status(400);
    throw new Error("ID required");
  }
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
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  getUserById,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};
