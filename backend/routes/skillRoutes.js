const express = require("express");
const router = express.Router({ mergeParams: true });
const { authenticateToken } = require("../middleware/authMiddleware");

const {
  getSkillsForUser,
  updateSkill,
  getSkillById,
  createSkillForUser,
  deleteSkill,
  searchSkills,
} = require("../controllers/skillController");

router.route("/").get(getSkillsForUser).post(createSkillForUser);
router.get("/search", searchSkills);

router.route("/:skillId").get(getSkillById).put(updateSkill).delete(deleteSkill);

module.exports = router;
