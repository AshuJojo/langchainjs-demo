const { generateResponse, generatePromptTemplateResponse, generateSimilarityScore } = require("../services/courseGenerateService");

const getResponse = async (req, res) => {
  const { prompt } = req.body;

  const result = await generateResponse(prompt);

  res.send(result);
};

const getPromptTemplateResponse = async(req, res) =>{
    const { product } = req.body;

    const result = await generatePromptTemplateResponse(product);
  
    res.send(result);
}

const getSimilarityStore = async(req, res) => {
    const {text1, text2} = req.body;

    if(!text1 || !text2)
        res.send("Please provide text1 & text2");

    const result = await generateSimilarityScore(text1, text2);

    res.send(result);
}

module.exports = {getResponse, getPromptTemplateResponse, getSimilarityStore}