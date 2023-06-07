const { MongoClient } = require("mongodb");
const express = require("express");



const uri = "mongodb+srv://abdelboussaboun:uyZQLIVDBqq3cN4i@cluster0.qgdicmo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
    try {
      const database = client.db('pangolin');
      const lists = database.collection('profils');
      const data = await lists.findOne();
      console.log(data);
    } finally {
        await client.close();
    }
  }
  run().catch(console.dir);



const app = express();

app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(8080, () => {
    console.log("listening on port 8080");
});