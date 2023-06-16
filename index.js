const express = require("express");
const app = express();
var cors = require('cors')
const PORT = process.env.PORT || 3030;


const todoRoutes = require("./routes/todo")






app.get("/", (req, res) => {
    res.send("hello world");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/api", todoRoutes);


app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });
