const { urlencoded } = require("express");
const express = require("express");
const jsonfile = require("jsonfile");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8888;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", require("./routes/userRoutes"));

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
