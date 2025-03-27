const express = require("express");
const router = express.Router();
const {
  getSingleResponse,
  getMultiResponse
} = require("../controllers/generateController");

router.post("/", getSingleResponse);
router.post("/convo-ice-breaker", getMultiResponse);

module.exports = router;
