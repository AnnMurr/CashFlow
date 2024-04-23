const express = require("express");
const app = express();
const cors = require("cors");
const { connectToDb, getDb } = require("../db/db");

app.use(cors());
app.use(express.json());

let db;

app.post("/putdata", async (req, res) => {
  const userData = req.body.userData;

  try {
    const collection = db.collection("users");
    const insertResult = await collection.insertOne({ data: userData });
    const { insertedId } = insertResult;
    const cleanInsertedId = insertedId.toString();

    res.status(200).send(cleanInsertedId);
  } catch (error) {
    console.error(error);
    res.status(500).send("error posting data");
  }
});

app.post("/check-data", async (req, res) => {
  const email = req.body.email;
  const collection = db.collection("users");
  const cursor = collection.find({});
  const allData = await cursor.toArray();
  const result = allData.find((userData) => userData.email === email);

  try {
    if (result === undefined) {
      res.status(200).send(false);
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("error checking data");
  }
});

connectToDb((err) => {
  if (!err) {
    app.listen(process.env.PORT, (err) => {
      !err
        ? console.log(`listening on port ${process.env.PORT}`)
        : console.error(`error listening on port ${process.env.PORT}: ${err}`);
    });
    db = getDb();
  } else {
    console.log(`DB connection error ${err}`);
  }
});
