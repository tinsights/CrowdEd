const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../config/MongoUtil");

function generateAccessToken(id, email, username) {
  return jwt.sign({ id, email, username }, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
}

async function userLogin(req, res) {
  console.log(req.body);
  const payload = req.body;
  const { email, password, username } = payload;
  if (!email || !password || !username) {
    res.status(400);
    throw new Error("Invalid Form");
  } else {
    const user = await db.get().collection("users").findOne({
      email,
      username,
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateAccessToken(user._id, user.email, user.username);
      res.cookie("access_token", token, { httpOnly: true });
      res.status(200).json({ token });
    } else {
      res.status(404);
      throw new Error("Invalid Credentials");
    }
  }
}

module.exports = {
  userLogin,
};