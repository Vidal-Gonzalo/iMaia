const express = require("express");
const router = express.Router();
const { getElementsByName } = require("../controllers/searchControllers.js");

router.get(`/:type/:name`, getElementsByName);

module.exports = router;
