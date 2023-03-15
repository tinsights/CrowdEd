const jsonfile = require("jsonfile");
const { User, Skill } = require("../classes");

function getUsers(req, res) {
  jsonfile
    .readFile("./backend/users.json")
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.log(err);
    });
}

function addUser(req, res) {
  const payload = req.body;
  const { name, email, location, skills } = payload;
  if (!name || !email || !location || !skills) {
    res.status(400);
    throw new Error("Invalid Form");
  }
  res.status(200).json({ message: "Set User" });
}

function updateUser(req, res) {
  res.status(200).json({ message: `Update User ${req.params.id}` });
}

function deleteUser(req, res) {
  res.status(200).json({ message: `Delete User ${req.params.id}` });
}

module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};
