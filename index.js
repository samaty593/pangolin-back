const express = require("express");
const app = express();
var cors = require('cors')

const todoRoutes = require("./routes/todo")






app.get("/", (req, res) => {
    res.send("hello world");
});

// For parsing application/json
app.use(express.json());
 
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/api", todoRoutes);

app.listen(8080, () => {
    console.log("listening on port 8080");
});