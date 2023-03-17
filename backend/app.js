const { urlencoded } = require("express");
const express = require("express");
const jsonfile = require("jsonfile");
const path = require("path");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8888;
const { errorHandler } = require("./middleware/errorMiddleware");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
app.set("views", path.join(__dirname, "/views"));

app.use("/:mode/users", require("./routes/userRoutes"));
app.use("/:mode/skills", require("./routes/skillRoutes"));

app.get("/", (req, res) => {
  console.log(req.params);
  res.render("pages/index.ejs");
});

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
