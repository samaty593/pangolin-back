const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://abdelboussaboun:uyZQLIVDBqq3cN4i@cluster0.qgdicmo.mongodb.net/?retryWrites=true&w=majority";

const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(8080, () => {
    console.log("listening on port 8080");
});