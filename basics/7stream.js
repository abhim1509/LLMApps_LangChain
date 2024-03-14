import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

const execute = async () => {
  const model = new ChatOpenAI({
    modelName: process.env.MODEL,
    openAIApiKey: process.env.OPENAPIKEY
  });

  const prompt = ChatPromptTemplate.fromTemplate(
    `What are three good names for a company that makes {product}?`
  );
  const outputParser = new StringOutputParser();

  //Equivalent to pipe method.
  const nameGenerationChain = RunnableSequence.from([
    prompt,
    model,
    outputParser,
  ]);

  //Stream
  const stream = await nameGenerationChain.stream({
    product: "really cool robots",
  });

  for await (const chunk of stream) {
    console.log(chunk);
  }
};

execute();
