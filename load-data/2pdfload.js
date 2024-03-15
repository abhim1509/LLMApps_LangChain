import { PDFLoader } from "langchain/document_loaders/fs/pdf";

const execute = async () => {
  const loader = new PDFLoader("./data/cover.pdf");
  const rawCS229Docs = await loader.load();
  console.log(rawCS229Docs.slice(0, 1));
};

execute();
