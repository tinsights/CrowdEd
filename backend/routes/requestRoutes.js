const express = require("express");
const router = express.Router({ mergeParams: true });
const { authenticateToken } = require("../middleware/authMiddleware");

const {
  getRequestsForUser,
  createRequestForUser,
  getRequestById,
  updateRequest,
  deleteRequest,
} = require("../controllers/requestController");

router.route("/").get(getRequestsForUser).post(createRequestForUser);

router.route("/:requestId").get(getRequestById).put(updateRequest).delete(deleteRequest);

module.exports = router;
