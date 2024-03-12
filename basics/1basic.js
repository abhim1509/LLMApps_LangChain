import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { config } from "dotenv";
config();
try {
  const execute = async () => {
    const model = new ChatOpenAI({
      modelName: process.env.MODELNAME,
      openAIApiKey: process.env.OPENAIAPIKEY,
    });

    const result = await model.invoke([new HumanMessage("Tell me a joke.")]);
    console.log(result);
  };

  execute();
} catch (error) {
  console.log(error);
}
