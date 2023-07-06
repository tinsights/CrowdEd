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
  const { email, password } = payload;
  if (!email || !password) {
    res.status(400);
  } else {
    const user = await db.get().collection("users").findOne({
      email,
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateAccessToken(user._id, user.email, user.username);
      res.cookie("access_token", token, { httpOnly: true });
      res.status(200).json({ ...user, token });
    } else {
      res.status(404);
    }
  }
}

module.exports = {
  userLogin,
};
