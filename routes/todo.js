const express = require("express");
const router = express.Router();
const todoController = require("../controlers/todo")

router.get("", todoController.getMyProfilInfo);
router.delete("", todoController.deleteFriend);
router.get("/listAll", todoController.getAllPangolin);
router.put("", todoController.addFriend);
router.post("", todoController.createProfil);
module.exports = router;