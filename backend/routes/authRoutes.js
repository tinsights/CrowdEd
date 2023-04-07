import userLogin from "../controllers/authControllers.js";

// login and logout routes
router.post("/login", userLogin);

router.get("/logout", (req, res) => {
  console.log("logging out");
  res.clearCookie("access_token");
  res.status(200).json({ message: "Logged out" });
});
