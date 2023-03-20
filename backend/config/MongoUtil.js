const MongoClient = require("mongodb").MongoClient;
const MONGO_URI = process.env.MONGO_URI;
const MONGO_DB = process.env.MONGO_DBNAME;

async function connect(uri, dbname) {
  const client = await MongoClient.connect(MONGO_URI, {
    useUnifiedTopology: true,
  });
  _db = client.db();
  return _db;
}
