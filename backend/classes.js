const ObjectId = require("mongodb").ObjectId;

/** Class representing a User */
class User {
  /**
   *
   * @param {string} name
   * @param {string} email
   * @param {[lat,lng]} location
   * @param {[Skills]} skills
   */
  constructor(name, email, location, skills) {
    this._id = new ObjectId();
    this.name = name;
    this.email = email;
    this.location = location;
    this.skills = skills;
    this.inbox = [];
    this.outbox = [];
  }
}

class Skill {
  constructor(category, subject, title, description) {
    this._id = new ObjectId();
    this.category = category;
    this.subject = subject;
    this.title = title;
    this.description = description;
    this.numEndorsements = [];
    this.endorsements = [];
  }
}

module.exports = {
  User,
  Skill,
};
