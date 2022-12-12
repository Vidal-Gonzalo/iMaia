const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserData,
  getUserDataByUsername,
  getUserSubscriptions,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUserData);
router.get("/user/:username", getUserDataByUsername);
router.get("/:subscriptionType/user/:id", getUserSubscriptions);
module.exports = router;
