const express = require("express");
const router = express.Router();
const {
    getResponse,
    getPromptTemplateResponse,
    getSimilarityStore
} = require("../controllers/courseController");

router.post("/", getResponse);
router.post("/prompt-template", getPromptTemplateResponse);
router.post("/embeddings/similarity-score", getSimilarityStore);

module.exports = router;
