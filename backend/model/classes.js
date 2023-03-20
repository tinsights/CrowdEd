const ObjectId = require("mongodb").ObjectId;

/** Class representing a User */
class User {
  /**
   *
   * @param {String} name
   * @param {String} email
   * @param {String} location // postCode
   * @param {[Skills]} skills
   */
  constructor(name, email, location, skill) {
    this._id = new ObjectId();
    this.name = name;
    this.email = email;
    this.location = location;
    this.skills = []; // skillID, skill title.
    // this.inbox = [];
    // this.outbox = [];
  }
}

/** Class representing a Skill */
class Skill {
  /**
   *
   * @param {String} category
   * @param {String} subject
   * @param {String} title
   * @param {String} description
   */
  constructor(userID, teacherName, title, description, location) {
    this._id = new ObjectId();
    this.userID = userID;
    this.teacherName = teacherName;
    // this.category = category;
    // this.subject = subject;
    this.title = title;
    this.description = description;
    this.locations = [location];
    this.endorsements = [];
  }
}

module.exports = {
  User,
  Skill,
};
