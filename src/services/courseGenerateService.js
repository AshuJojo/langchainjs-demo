const { HumanMessage } = require("@langchain/core/messages");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} = require("@langchain/core/prompts");
const { RunnableSequence } = require("@langchain/core/runnables");
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { z } = require("zod");

const generateResponse = async (prompt) => {
  try {
    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash",
    });

    if (!prompt) {
      return { error: "Prompt is required" };
    }

    const response = await model.invoke([new HumanMessage(prompt)]);

    console.log("response", response);

    return response.content;
  } catch (error) {
    console.error("Error generating response:", error);
    return error;
  }
};

const generatePromptTemplateResponse = async (product) => {
  try {
    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash",
    });

    if (!product) {
      return { error: "Product is required" };
    }

    // Single Prompt template with human message
    // const promptTemplate = ChatPromptTemplate.fromTemplate(
    //     `What are three good names for a company that makes {product}`
    // )

    // Multi prompt template with system & human message
    const promptTemplate = ChatPromptTemplate.fromMessages([
      SystemMessagePromptTemplate.fromTemplate(
        "You are an expert at picking company names."
      ),
      HumanMessagePromptTemplate.fromTemplate(
        "What are three good names for a company that makes {product}?"
      ),
    ]);

    // format message from prompt template to see how does the message transforms when the prompt is passed in template
    const message = await promptTemplate.formatMessages({
      product,
    });

    console.log("message", message);

    // create a string output parser
    const outputParser = new StringOutputParser();

    // create chain with prompt template -> model -> output parser
    // const chain = promptTemplate.pipe(model).pipe(outputParser);

    // create runnable sequence for prompt -> model -> outputParser
    const chain = RunnableSequence.from([
        promptTemplate,
        model,
        outputParser
    ])

    // get the reponse from chain with product 
    // const response = await chain.invoke({
    //   product,
    // });

    // console.log("response", response);

    // Stream Response
    let response = "";

    const stream = await chain.stream({
        product,
    })

    for await (const chunk of stream){
        console.log('\n----Stream ----\n', chunk);
        response += chunk;
    }

    // return response to user
    return response;
  } catch (error) {
    console.error("Error generating response:", error);
    return error;
  }
};

module.exports = { generateResponse, generatePromptTemplateResponse };
