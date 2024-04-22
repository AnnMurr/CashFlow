const { MongoClient } = require("mongodb");

const URL = "mongodb://localhost:27017/CashFlow";

let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(URL)
      .then((client) => {
        console.log("Connecting to database");
        dbConnection = client.db();
        cb(null);
      })
      .catch((err) => {
        return cb(err);
      });
  },
  getDb: () => dbConnection,
};
