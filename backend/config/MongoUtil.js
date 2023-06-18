const dotenv = require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

const MONGO_URI = process.env.MONGO_URI;
const MONGO_DBNAME = process.env.MONGO_DBNAME;
let mongodb;
let client;

async function connect() {
  client = await MongoClient.connect(MONGO_URI, {
    useUnifiedTopology: true,
  });
  mongodb = client.db(MONGO_DBNAME);
}

function get() {
  return mongodb;
}

function getClient() {
  return client;
}

function close() {
  mongodb.close();
}

module.exports = {
  connect,
  getClient,
  get,
  close,
};
