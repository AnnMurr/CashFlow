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
    const collection2 = db.collection("googleUsers");
    const insertResult = await collection.findOne({ _id: new ObjectId(id) });
    const insertResult2 = await collection2.findOne({ _id: new ObjectId(id) });

    if (insertResult) {
      delete insertResult._id;
      res.status(200).send(insertResult);
    } else if (insertResult2) {
      delete insertResult2._id;
      res.status(200).send(insertResult2);
    } else {
      res.status(404).send("data not found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).send("error finding data");
  }
});

const putData = async (collectionName, userData, res) => {
  if (!userData)
    res.status(400).send("userData parameter is missing or invalid");

  try {
    const collection = db.collection(collectionName);

    const insertResult = await collection.insertOne(userData);
    const { insertedId } = insertResult;
    const cleanInsertedId = insertedId;
    res.status(200).send(cleanInsertedId);
  } catch (error) {
    console.error(error);
    res.status(500).send("error posting data");
  }
};

app.post("/putdata", async (req, res) => {
  const userData = req.body.userData;
  await putData("users", userData, res);
});

app.post("/putdata-google", async (req, res) => {
  const userData = req.body.userData;
  await putData("googleUsers", userData, res);
});

app.post("/users/check", async (req, res) => {
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

const checkUserDataByEmail = async (collectionName, email, res) => {
  const collection = db.collection(collectionName);

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
};

app.post("/users/check-email", (req, res) => {
  const email = req.body.userData;
  checkUserDataByEmail("users", email, res);
});

app.post("/users/google/check-email", (req, res) => {
  const email = req.body.userData;
  checkUserDataByEmail("googleUsers", email, res);
});

app.patch("/change-data", async (req, res) => {
  const { id, newData } = req.body;
  const collection = db.collection("users");
  const collection2 = db.collection("googleUsers");

  if (!id) res.status(400).send("ID parameter is missing or invalid");
  if (!newData) res.status(400).send("newData parameter is missing or invalid");

  try {
    const filter = { _id: new ObjectId(id) };
    const updateDoc = { $set: newData };
    const result = await collection.updateOne(filter, updateDoc);
    const result2 = await collection2.updateOne(filter, updateDoc);

    if (!!result.matchedCount || !!result2.matchedCount) {
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

app.post("/link-account-to-google", async (req, res) => {
  const { id } = req.body;

  if (!id) res.status(400).send("ID parameter is missing or invalid");

  try {
    const collection = db.collection("users");
    const userData = await collection.findOne({ _id: new ObjectId(id) });

    await collection.deleteOne({ _id: new ObjectId(id) });
    delete userData.password;
    await putData("googleUsers", userData, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("error creating user");
  }
});

app.post("/check-google-account", async (req, res) => {
  const { id } = req.body;

  if (!id) res.status(400).send("ID parameter is missing or invalid");

  try {
    const collection = db.collection("googleUsers");
    const userData = await collection.findOne({ _id: new ObjectId(id) });

    console.log("fnjsknjf", userData);
    if (userData) {
      res.status(200).send(true);
    } else {
      console.error(error);
      res.status(500).send("It is not a google account");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("error creating user");
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
