import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

const execute = async () => {
  const prompt = ChatPromptTemplate.fromTemplate(
    `What are three good names for a company that makes {product}?`
  );
  const outputParser = new StringOutputParser();

   const model = new ChatOpenAI({
    modelName: process.env.MODEL,
    openAIApiKey: process.env.OPENAPIKEY
  });

  const nameGenerationChain = prompt.pipe(model).pipe(outputParser);

  const result = await nameGenerationChain.invoke({
    product: "fancy cookies",
  });

  console.log(result);
};

execute();
