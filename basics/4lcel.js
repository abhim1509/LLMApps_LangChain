//Elegant way of prompts and models -Expression language
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

const execute = async () => {
  const prompt = ChatPromptTemplate.fromTemplate(
    `What are three good names for a company that makes {product}?`
  );
  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo-1106",
    openAIApiKey: "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",
  });

  const chain = prompt.pipe(model);
  let result = await chain.invoke({
    product: "colorful socks",
  });

  console.log(result);
};

execute();
