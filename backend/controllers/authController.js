import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

function generateAccessToken(id, email) {
  return jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
}

async function userLogin(req, res) {
  console.log(req.body);
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
  userLogin,
};
