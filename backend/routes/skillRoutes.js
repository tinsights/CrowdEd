const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Get Skills" });
});

router.post("/", (req, res) => {
  res.status(200).json({ message: "Create Skill" });
});

router.put("/:id", (req, res) => {
  res.status(200).json({ message: `Update Skill ${req.params.id}` });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({ message: `Delete Skill ${req.params.id}` });
});

module.exports = router;
