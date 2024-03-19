import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { config } from "dotenv";
config();
import { ChatPromptTemplate } from "@langchain/core/prompts";

const memoryVectorStore = async () => {
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAIAPIKEY,
  });

  const loader = new PDFLoader("./data/pdf.pdf");
  const rawCS229Docs = await loader.load();

  const splitter = new CharacterTextSplitter({
    chunkSize: 32,
    chunkOverlap: 0,
    separators: " ",
  });
  //To split content form doc.
  const splitDocs = await splitter.splitDocuments(rawCS229Docs);

  const vectorstore = new MemoryVectorStore(embeddings);
  await vectorstore.addDocuments(splitDocs);

  return { vectorstore };
};

const execute = async () => {
  const model = new ChatOpenAI({
    modelName: process.env.MODELNAME,
    openAIApiKey: process.env.OPENAIAPIKEY,
  });

  const { vectorstore } = await memoryVectorStore();

    const retriever = vectorstore.asRetriever();
    //   const convertDocsToString = convert(splitDocs);
    const convertDocsToString = (documents) => {
      return documents
        .map((document) => {
          return `<doc>\n${document.pageContent}\n</doc>`;
        })
        .join("\n");
    };

    const documentRetrievalChain = RunnableSequence.from([
      (input) => input.question,
      retriever,
      convertDocsToString,
    ]);

  const TEMPLATE_STRING = `You are an experienced researcher, 
expert at interpreting and answering questions based on provided sources.
Using the provided context, answer the user's question 
to the best of your ability using only the resources provided. 
Be verbose!

<context>

{context}

</context>

Now, answer this question using the above context:

{question}`;

  const answerGenerationPrompt =
    ChatPromptTemplate.fromTemplate(TEMPLATE_STRING);
  const retrievalChain = RunnableSequence.from([
    {
      context: documentRetrievalChain,
      question: (input) => input.question,
    },
    answerGenerationPrompt,
    model,
    new StringOutputParser(),
  ]);

  const answer = await retrievalChain.invoke({
    question: "What are the prerequisites for this course?",
  });

  console.log(answer);

  const followupAnswer = await retrievalChain.invoke({
    question: "Can you list them in bullet point form?",
  });

  console.log(followupAnswer);

    const docs = await documentRetrievalChain.invoke({
      question: "Can you list them in bullet point form?",
    });

    console.log(docs);
};

execute();
