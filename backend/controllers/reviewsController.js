const ObjectId = require("mongodb").ObjectId;
const db = require("../config/MongoUtil");

// get all reviews for a skill
async function getReviewsForSkill(req, res) {
  const userId = new ObjectId(req.params.userId);
  const skillId = new ObjectId(req.params.skillId);
  db.get()
    .collection("users")
    .findOne(
      { _id: userId, "skills._id": skillId },
      {
        projection: {
          "skills.$": 1,
        },
      }
    )
    .then((result) => {
      console.log(result);
      res.status(200).json(result.skills[0].ratingsAndReviews);
    })
    .catch((err) => {
      res.status(500);
      throw new Error(err);
    });
}

// create a rating and review for a skill
async function createRatingAndReviewForSkill(req, res) {
  console.log("review");
  console.log(req.body);
  const payload = req.body;
  const loggedInUser = req.userDetails;
  const { rating, reviewText } = payload;
  if (!rating || !reviewText) {
    res.status(400);
    throw new Error("Invalid Form");
  }
  // check if rating is between 1 and 5
  if (rating < 0 || rating > 5) {
    res.status(400);
    throw new Error("Invalid Rating");
  }

  const userId = new ObjectId(req.params.userId);
  const skillId = new ObjectId(req.params.skillId);
  db.get()
    .collection("users")
    .findOneAndUpdate(
      { _id: userId, "skills._id": skillId },
      {
        $push: {
          "skills.$.ratingsAndReviews": {
            _id: new ObjectId(),
            reviewer: loggedInUser,
            rating,
            review: reviewText,
          },
        },
      },
      {
        returnDocument: "after",
      }
    )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500);
      throw new Error(err);
    });
}

// update a rating and review for a skill
async function updateRatingAndReviewForSkill(req, res) {
  const payload = req.body;
  const loggedInUser = req.userDetails;
  const { rating, reviewText } = payload;
  console.log(rating, reviewText);
  if (!rating || !reviewText) {
    res.status(400);
    throw new Error("Invalid Form");
  }
  // check if rating is between 1 and 5
  if (rating < 0 || rating > 5) {
    res.status(400);
    throw new Error("Invalid Rating");
  }

  const userId = new ObjectId(req.params.userId);
  const skillId = new ObjectId(req.params.skillId);
  const reviewId = new ObjectId(req.params.reviewId);
  const reviewerId = loggedInUser._id;
  db.get()
    .collection("users")
    .updateOne(
      {
        _id: userId,
        "skills._id": skillId,
        "skills.ratingsAndReviews._id": reviewId,
        "skills.ratingsAndReviews.reviewer._id": reviewerId,
      },
      {
        $set: {
          "skills.$.ratingsAndReviews.$[review].rating": rating,
          "skills.$.ratingsAndReviews.$[review].review": reviewText,
        },
      },
      {
        arrayFilters: [
          {
            "review._id": reviewId,
            "review.reviewer._id": reviewerId,
          },
        ],
        returnDocument: "after",
      }
    )
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500);
      throw new Error(err);
    });
}

// delete review
async function deleteRatingAndReviewForSkill(req, res) {
  const userId = new ObjectId(req.params.userId);
  const skillId = new ObjectId(req.params.skillId);
  const ratingAndReviewId = new ObjectId(req.params.ratingAndReviewId);
  db.get()
    .collection("users")
    .findOneAndUpdate(
      {
        _id: userId,
        "skills._id": skillId,
      },
      {
        $pull: {
          "skills.$.ratingsAndReviews": {
            _id: ratingAndReviewId,
          },
        },
      },
      {
        returnDocument: "after",
      }
    )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500);
      throw new Error(err);
    });
}

module.exports = {
  getReviewsForSkill,
  createRatingAndReviewForSkill,
  updateRatingAndReviewForSkill,
  deleteRatingAndReviewForSkill,
};
