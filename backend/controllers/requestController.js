const ObjectId = require("mongodb").ObjectId;
const db = require("../config/MongoUtil");

// get all requests
async function getAllRequests(req, res) {
  db.get()
    .collection("users")
    .find(
      {
        requests: {
          $exists: true,
          $not: {
            $size: 0,
          },
        },
      },
      {
        projection: {
          username: 1,
          location: 1,
          requests: 1,
        },
      }
    )
    .toArray()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500);
    });
}

// get all requests for a user
async function getRequestsForUser(req, res) {
  const userId = new ObjectId(req.params.userId);
  db.get()
    .collection("users")
    .findOne(
      {
        _id: userId,
      },
      { projection: { password: 0, skills: 0 } }
    )
    .then((result) => {
      console.log(result);
      res.status(200).json(result.requests);
    })
    .catch((err) => {
      res.status(500);
    });
}

// create a request for a user
async function createRequestForUser(req, res) {
  const payload = req.body;
  console.log(payload);
  const { title, description, category } = payload;
  if (!title || !description || !category) {
    res.status(400).send("Invalid Form");
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
        projection: {
          password: 0,
          skills: 0,
          requests: { $slice: -1 },
        },
      }
    )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500);
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
    });
}

// delete a request for a user
async function deleteRequest(req, res) {
  const userId = new ObjectId(req.params.userId);
  const requestId = new ObjectId(req.params.requestId);
  db.get()
    .collection("users")
    .findOneAndUpdate(
      { _id: userId },
      { $pull: { requests: { _id: requestId } } },
      { returnDocument: "after", projection: { password: 0, skills: 0 } }
    )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500);
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
      password: 0,
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
    });
}

module.exports = {
  getAllRequests,
  getRequestsForUser,
  createRequestForUser,
  getRequestById,
  searchRequests,
  updateRequest,
  deleteRequest,
};
