async function connectToDb() {
  const _db = await connect(MONGO_URI, MONGO_DB);
  return _db;
}

// connectToDb(MONGO_URI, MONGO_DB).then((_db) => console.log(_db));
