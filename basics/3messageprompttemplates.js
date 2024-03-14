import {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
} from "@langchain/core/prompts";

let execute = async () => {
  const promptFromMessages = ChatPromptTemplate.fromMessages([
    SystemMessagePromptTemplate.fromTemplate(
      "You are an expert at picking company names."
    ),
    HumanMessagePromptTemplate.fromTemplate(
      "What are three good names for a company that makes {product}?"
    ),
  ]);
  //Multiple prompts can be formatted.
  let result = await promptFromMessages.formatMessages({
    product: "shiny objects",
  });

  console.log(result);

  //Short hand notation for multiple prompts to be formatted.
  const promptFromMessagesShortHand = ChatPromptTemplate.fromMessages([
    ["system", "You are an expert at picking company names."],
    ["human", "What are three good names for a company that makes {product}?"],
  ]);

  let output = await promptFromMessagesShortHand.formatMessages({
    product: "shoes",
  });

  console.log(output);
};

//Can direct history messages directly in the prompt.
execute();
