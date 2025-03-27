const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const {z} = require('zod');

const generateSingleResponse = async (prompt) => {
  try {
    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash",
    });

    if (!prompt) {
      return { error: "Prompt is required" };
    }

    const response = await model.invoke([["human", prompt]]);

    console.log("response", response);

    return response.content;
  } catch (error) {
    console.error("Error generating response:", error);
    return error;
  }
};

const generateMultiResponse = async (prompt) => {
  try {
    const convoIceBreakerSchema = z.object({
      antiAwkwardness: z.string().describe(`Conversation ice breaker humours phrase that end the awkward silence between two. For example: "Uh-oh, we've hit the awkward silence zone. Let me save you both with a random fact: Did you know lobsters communicate by peeing at each other? You're welcome."`),
      roastmaster: z.string().describe(`Roast other user with a humours ice breaker phrase. You are talking with text, so only include pharses that make sense when you are talking with a person on text. For example: "I see we've got two introverts trying to out-introvert each other. Should I just start talking to myself?"`),
      randomOutburst: z.string().describe(`Every now and then, AI blurts out something completely unexpected. For example: "I just realized... Spaghetti is basically edible shoelaces. Okay, carry on."`),
      totallyRealFake: z.string().describe(`AI makes up completely fake but believable fun facts. For example: "Did you know that dolphins invented jazz music but gave up because humans kept stealing their beats?"`),
      unhelpfulLifeAdvice: z.string().describe(`AI drops completely useless yet oddly relatable wisdom. For example: "If at first you don't succeed… blame it on Mercury retrograde."`),
    });

    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash",
      temperature: 0,
    });

    
    if (!prompt) {
      return { error: "Prompt is required" };
    }

    const modelWithStructure = model.withStructuredOutput(convoIceBreakerSchema);

    const response = await modelWithStructure.invoke("Ice breaker phrases according to user's current conversation. ");

    console.log("response", response);

    return response;
  } catch (error) {
    console.error("Error generating response:", error);
    return error;
  }
};

module.exports = { generateSingleResponse, generateMultiResponse };
