const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserData,
  getUserDataByUsername,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUserData);
router.get("/user/:username", getUserDataByUsername);

module.exports = router;
