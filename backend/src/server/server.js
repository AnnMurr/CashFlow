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
    const insertResult = await collection.insertOne(userData);
    const { insertedId } = insertResult;
    const cleanInsertedId = insertedId;

    res.status(200).send(cleanInsertedId);
  } catch (error) {
    console.error(error);
    res.status(500).send("error posting data");
  }
});

app.post("/check-data", async (req, res) => {
  const { email, password } = req.body.userData;
  const collection = db.collection("users");

  try {
    const user = await collection.findOne({ email: email });

    if (user && user.password === password) {
      res.status(200).send(user._id);
    } else {
      res.status(200).send(false);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("error checking data");
  }
});

app.post("/check-data-email", async (req, res) => {
  const { email } = req.body.userData;
  const collection = db.collection("users");

  try {
    const user = await collection.findOne({ email: email });
    console.log(user)
    if (user) {
      res.status(200).send(user._id);
    } else {
      res.status(200).send(false);
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
