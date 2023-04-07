const express = require("express");
const router = express.Router({ mergeParams: true });
const { authenticateToken } = require("../middleware/authMiddleware");

const {
  getReviewsForSkill,
  createRatingAndReviewForSkill,
  updateRatingAndReviewForSkill,
  deleteRatingAndReviewForSkill,
} = require("../controllers/reviewsController");

router.route("/").get(getReviewsForSkill).post(authenticateToken, createRatingAndReviewForSkill);

router
  .route("/:reviewId")
  .put(authenticateToken, updateRatingAndReviewForSkill)
  .delete(authenticateToken, deleteRatingAndReviewForSkill);

module.exports = router;
