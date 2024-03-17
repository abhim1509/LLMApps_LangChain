import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { config } from "dotenv";
config();

const memoryVectorStoreImplementation = async () => {
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAIAPIKEY,
  });

  const loader = new PDFLoader("./data/pdf.pdf");
  const rawCS229Docs = await loader.load();
  //   console.log(rawCS229Docs.slice(0, 1));

  const splitter = new CharacterTextSplitter({
    chunkSize: 32,
    chunkOverlap: 0,
    separators: " ",
  });
  //To split content form doc.
  const splitDocs = await splitter.splitDocuments(rawCS229Docs);

  //   console.log(splitDocs.slice(0, 5));
  const vectorstore = new MemoryVectorStore(embeddings);
  await vectorstore.addDocuments(splitDocs);

  //   const retrievedDocs = await vectorstore.similaritySearch(
  //     "What is deep learning?",
  //     4
  //   );

  //   const pageContents = retrievedDocs.map((doc) => doc.pageContent);
  //   console.log(pageContents);

  const retriever = vectorstore.asRetriever();
  const result = await retriever.invoke(
    "Get some reference on Geneva BOF session?"
  );
  console.log(result);
};

memoryVectorStoreImplementation();
