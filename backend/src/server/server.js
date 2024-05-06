const express = require("express");
const app = express();
const cors = require("cors");
const { connectToDb, getDb } = require("../db/db");
const { ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());

let db;

app.post("/get-data-id", async (req, res) => {
  const id = req.body.id;

  if (!id) res.status(400).send("ID parameter is missing or invalid");

  try {
    const collection = db.collection("users");
    const insertResult = await collection.findOne({ _id: new ObjectId(id) });
    delete insertResult._id;

    if (insertResult) {
      res.status(200).send(insertResult);
    } else {
      res.status(404).send("data not found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).send("error finding data");
  }
});

app.post("/putdata", async (req, res) => {
  const userData = req.body.userData;

  if (!userData)
    res.status(400).send("userData parameter is missing or invalid");

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

  if (!email) res.status(400).send("Email parameter is missing or invalid");
  if (!password)
    res.status(400).send("Password parameter is missing or invalid");

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
  const email = req.body.userData;
  const collection = db.collection("users");

  if (!email) res.status(400).send("Email parameter is missing or invalid");

  try {
    const user = await collection.findOne({ email: email });

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

app.patch("/change-data", async (req, res) => {
  const { id, newData } = req.body;
  const collection = db.collection("users");

  if (!id) res.status(400).send("ID parameter is missing or invalid");
  if (!newData) res.status(400).send("newData parameter is missing or invalid");

  try {
    const filter = { _id: new ObjectId(id) };
    const updateDoc = { $set: newData };
    const result = await collection.updateOne(filter, updateDoc);

    if (!!result.matchedCount) {
      res.status(200).send("data updated successfully");
    } else {
      res.status(404).send("error updating data");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("error checking data");
  }
});

app.delete("/delete-data", async (req, res) => {
  const { id } = req.body;
  const collection = db.collection("users");

  if (!id) res.status(400).send("ID parameter is missing or invalid");

  try {
    const response = await collection.deleteOne({ _id: new ObjectId(id) });

    if (response.deletedCount) {
      res.status(200).send("Data deleted successfully");
    } else {
      res.status(500).send("Error deleting data");
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
