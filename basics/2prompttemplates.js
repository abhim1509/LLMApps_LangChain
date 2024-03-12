import { ChatPromptTemplate } from "@langchain/core/prompts";
import { config } from "dotenv";
config();
try {
  const execute = async () => {
    //Can update prompt before passing to model.
    const prompt = ChatPromptTemplate.fromTemplate(
      `What are three good names for a company that makes {product}?`
    );

    let result = await prompt.format({
      product: "colorful socks",
    });

    console.log(result);

    //Converts it into Human message.
    let humanResult = await prompt.formatMessages({
      product: "shirts",
    });

    console.log(humanResult);
  };

  execute();
} catch (error) {
  console.log(error);
}
