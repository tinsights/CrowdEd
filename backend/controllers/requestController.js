const ObjectId = require("mongodb").ObjectId;
const db = require("../config/MongoUtil");

// get all requests for a user
async function getRequestsForUser(req, res) {
  const userId = new ObjectId(req.params.userId);
  db.get()
    .collection("users")
    .findOne({
      _id: userId,
    })
    .then((result) => {
      res.status(200).json(result.requests);
    })
    .catch((err) => {
      res.status(500);
      throw new Error(err);
    });
}

// create a request for a user
async function createRequestForUser(req, res) {
  const payload = req.body;
  const { title, description, category } = payload;
  if (!title || !description || !category) {
    res.status(400);
    throw new Error("Invalid Form");
  }
  const userId = new ObjectId(req.params.userId);
  db.get()
    .collection("users")
    .findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          requests: {
            _id: new ObjectId(),
            ...payload,
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

// get specific request
async function getRequestById(req, res) {
  const userId = new ObjectId(req.params.userId);
  const requestId = new ObjectId(req.params.requestId);
  db.get()
    .collection("users")
    .findOne({ _id: userId, "requests._id": requestId })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500);
      throw new Error(err);
    });
}

// update a request for a user
async function updateRequest(req, res) {
  const payload = req.body;
  const { title, description } = payload;
  const userId = new ObjectId(req.params.userId);
  const requestId = new ObjectId(req.params.requestId);
  db.get()
    .collection("users")
    .findOneAndUpdate(
      { _id: userId, "requests._id": requestId },
      {
        $set: {
          "requests.$.title": title,
          "requests.$.description": description,
        },
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

// delete a request for a user
async function deleteRequest(req, res) {
  const userId = new ObjectId(req.params.userId);
  const requestId = new ObjectId(req.params.requestId);
  db.get()
    .collection("users")
    .findOneAndUpdate({ _id: userId }, { $pull: { requests: { _id: requestId } } })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500);
      throw new Error(err);
    });
}

// search for requests in params
async function searchRequests(req, res) {
  const { query } = req.query;
  console.log(query);
  db.get()
    .collection("users")
    .find({
      requests: {
        $elemMatch: {
          $or: [{ title: { $regex: query, $options: "i" } }, { description: { $regex: query, $options: "i" } }],
        },
      },
    })
    .project({
      name: 1,
      email: 1,
      requests: {
        $filter: {
          input: "$requests",
          as: "request",
          cond: {
            $or: [{ $eq: ["$$request.title", query] }, { $eq: ["$$request.description", query] }],
          },
        },
      },
    })
    .toArray()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500);
      throw new Error(err);
    });
}

module.exports = {
  getRequestsForUser,
  createRequestForUser,
  getRequestById,
  searchRequests,
  updateRequest,
  deleteRequest,
};
