//Elegant way of prompts and models -Expression language
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

const execute = async () => {
  const prompt = ChatPromptTemplate.fromTemplate(
    `What are three good names for a company that makes {product}?`
  );
  const model = new ChatOpenAI({
    modelName: process.env.MODEL,
    openAIApiKey: process.env.OPENAPIKEY
  });

  const chain = prompt.pipe(model);
  let result = await chain.invoke({
    product: "colorful socks",
  });

  console.log(result);
};

execute();
