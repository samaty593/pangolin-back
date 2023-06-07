const express = require("express");
const router = express.Router();
const todoController = require("../controlers/todo")

router.get("", todoController.getMyProfilInfo);

module.exports = router;