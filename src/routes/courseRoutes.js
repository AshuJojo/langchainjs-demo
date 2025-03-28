const express = require("express");
const router = express.Router();
const {
    getResponse,
    getPromptTemplateResponse
} = require("../controllers/courseController");

router.post("/", getResponse);
router.post("/prompt-template", getPromptTemplateResponse);

module.exports = router;
