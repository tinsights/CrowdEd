const { urlencoded } = require("express");
const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const db = require("./config/MongoUtil");
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8888;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
app.set("views", path.join(__dirname, "/views"));

async function main() {
  await db.connect();
  app.use("/:mode/users", require("./routes/userRoutes"));
  app.use("/:mode/skills", require("./routes/skillRoutes"));

  app.get("/", async (req, res) => {
    res.redirect("/register");
  });
  app.get("/register", (req, res) => {
    res.render("pages/index.ejs");
  });
}

main();

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
