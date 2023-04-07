// export middleware to handle authentication via JWT
const jwt = require("jsonwebtoken");
function authenticateToken(req, res, next) {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }
    req.user = user;
    req.userDetails = {
      _id: user.id,
      email: user.email,
      username: user.username,
    };
    next();
  });
}

module.exports = { authenticateToken };
