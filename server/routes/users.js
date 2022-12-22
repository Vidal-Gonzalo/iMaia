const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserData,
  getUserDataByUsername,
  getUserSubscriptions,
  updateData,
  updatePassword,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUserData);
router.get("/user/:username", getUserDataByUsername);
router.get("/:subscriptionType/user/:id", getUserSubscriptions);
router.put("/", protect, updateData);
router.put("/password", protect, updatePassword);
module.exports = router;
