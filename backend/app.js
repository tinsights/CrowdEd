const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const db = require("./config/MongoUtil");
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const getAllSkills = require("./controllers/skillController").getAllSkills;
const getAllRequests = require("./controllers/requestController").getAllRequests;

const PORT = process.env.PORT || 8888;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
app.set("views", path.join(__dirname, "/views"));

async function main() {
  await db.connect();
  app.use("/:mode/users", require("./routes/userRoutes"));
  app.use("/:mode/users/:userId/skills", require("./routes/skillRoutes"));
  app.use("/:mode/users/:userId/requests", require("./routes/requestRoutes"));
  app.use("/:mode/users/:userId/skills/:skillId/reviews", require("./routes/reviewRoutes"));
  app.get("/api/skills", getAllSkills);
  app.get("/api/requests", getAllRequests);
  app.get("/api/categories", async (req, res) => {
    const categories = await db.get().collection("categories").find({}).toArray();
    res.status(200).json(categories);
  });
  // auth routes
  app.use("/auth", require("./routes/authRoutes"));
}

main();

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
