const express = require("express");
const router = express.Router({ mergeParams: true });
const { authenticateToken } = require("../middleware/authMiddleware");

const {
  getSkillsForUser,
  updateSkill,
  getSkillById,
  createSkillForUser,
  deleteSkill,
} = require("../controllers/skillController");

router.get("/", getSkillsForUser);
router.post("/", createSkillForUser);

router.get("/:skillId", getSkillById);

router.put("/:skillId", updateSkill);

router.delete("/:skillId", deleteSkill);

router.put("/:skillId", (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: `Update skill ${req.params.skill_id} for user ${req.params.id}` });
});

router.delete("/:skillId", deleteSkill);

module.exports = router;
