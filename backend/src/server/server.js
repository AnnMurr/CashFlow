const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5050;

app.use(cors());
app.use(express.json());

let db;

app.post("/putdata/", async (req, res) => {
  const userData = req.body.userData;

  try {
    const collection = db.collection("users");
    const insertResult = await collection.insertOne({ data: userData });
    const { insertDataId } = insertResult;
    const cleanInsertedId = insertDataId.toString();

    res.status(200).send(cleanInsertedId);
  } catch (error) {
    console.error(error);
    res.status(500).send("error posting data");
  }
});

app.listen(PORT, (err) => {
  !err
    ? console.log(`listening on port ${PORT}`)
    : console.error(`error listening on port ${PORT}: ${err}`);
});
