import { OpenAIEmbeddings } from "@langchain/openai";
import { config } from "dotenv";
config();
import { similarity } from "ml-distance";

const execute = async () => {
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAIAPIKEY,
  });

  //Vector in form of array of numbers.
  const result = await embeddings.embedQuery("This is some sample text");
  console.log(result);

  const vector1 = await embeddings.embedQuery(
    "What are vectors useful for in machine learning?"
  );
  const unrelatedVector = await embeddings.embedQuery(
    "A group of parrots is called a pandemonium."
  );
  //Checking the similarity between vectors.
  console.log(similarity.cosine(vector1, unrelatedVector));

  const similarVector = await embeddings.embedQuery(
    "Vectors are representations of information."
  );

  console.log(similarity.cosine(vector1, similarVector));
};

execute();
