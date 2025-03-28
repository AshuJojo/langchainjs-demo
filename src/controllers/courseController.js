const { generateResponse, generatePromptTemplateResponse } = require("../services/courseGenerateService");

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

module.exports = {getResponse, getPromptTemplateResponse}