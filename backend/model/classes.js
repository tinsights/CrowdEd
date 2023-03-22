const ObjectId = require("mongodb").ObjectId;

/** Class representing a User */
class User {
  constructor(name, email, location) {
    this._id = new ObjectId();
    this.name = name;
    this.email = email;
    this.location = location;
    this.skills = []; // skillID, skill title.
  }
}

/** Class representing a Skill */
class Skill {
  constructor(userID, teacherName, title, description) {
    this._id = new ObjectId();
    this.userID = userID;
    this.teacherName = teacherName;
    this.title = title;
    this.description = description;
    this.endorsements = [];
  }
}

module.exports = {
  User,
  Skill,
};
