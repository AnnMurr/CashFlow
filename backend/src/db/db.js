const { MongoClient } = require("mongodb");
require('dotenv').config();

const URL = `mongodb+srv://annmurina111:${process.env.MONGO_DB_KEY}@cluster0.elrx1as.mongodb.net/CashFlowData?retryWrites=true&w=majority&appName=Cluster0`;

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
