const express = require("express");
const fs = require("fs");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8888;
const app = express();
const { User, Skill } = require("./classes");

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
