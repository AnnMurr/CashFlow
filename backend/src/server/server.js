const express = require("express");
const app = express();
const cors = require("cors");
const { connectToDb, getDb } = require("../db/db");
const { ObjectId } = require("mongodb");
const PORT = process.env.PORT || 5050;

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use(express.json());

let db;

app.get("/", (req, res) => {
  res.send("Server is running. Use specific endpoints for API calls.");
});

app.post("/get-data-id", async (req, res) => {
  const id = req.body.id;

  if (!id) res.status(400).send("ID parameter is missing or invalid");

  try {
    const usersCollection = db.collection("users");
    const googleCollection = db.collection("googleUsers");
    const usersCollectionResult = await usersCollection.findOne({ _id: new ObjectId(id) });
    const googleCollectionResult = await googleCollection.findOne({ _id: new ObjectId(id) });
    const result = usersCollectionResult || googleCollectionResult;
    
    if (result) {
      delete result._id;
      res.status(200).send(result);
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

app.patch("/change-data", async (req, res) => {
  const { id, newData } = req.body;
  const usersCollection = db.collection("users");
  const googleCollection = db.collection("googleUsers");

  if (!id) res.status(400).send("ID parameter is missing or invalid");
  if (!newData) res.status(400).send("newData parameter is missing or invalid");

  try {
    const filter = { _id: new ObjectId(id) };
    const updateDoc = { $set: newData };
    const usersCollectionResult = await usersCollection.updateOne(filter, updateDoc);
    const googleCollectionResult = await googleCollection.updateOne(filter, updateDoc);

    if (usersCollectionResult.matchedCount || googleCollectionResult.matchedCount) {
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
  const usersCollection = db.collection("users");
  const googleCollection = db.collection("googleUsers");

  if (!id) res.status(400).send("ID parameter is missing or invalid");

  try {
    const filter = { _id: new ObjectId(id) };
    const usersCollectionResult = await usersCollection.deleteOne(filter);
    const googleCollectionResult = await googleCollection.deleteOne(filter);

    if (usersCollectionResult.deletedCount || googleCollectionResult.deletedCount) {
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

    if (userData) {
      res.status(200).send(true);
    } else {
      res.status(200).send(false);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("error creating user");
  }
});

connectToDb((err) => {
  if (!err) {
    app.listen(PORT, (err) => {
      !err
        ? console.log(`listening on port ${PORT}`)
        : console.error(`error listening on port ${PORT}: ${err}`);
    });
    db = getDb();
  } else {
    console.log(`DB connection error ${err}`);
  }
});
