import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { CharacterTextSplitter } from "langchain/text_splitter";

const splitter = RecursiveCharacterTextSplitter.fromLanguage("js", {
  chunkSize: 32,
  chunkOverlap: 0,
});

const execute = async () => {
  const code = `function helloWorld() {
        console.log("Hello, World!");
        }
        // Call the function
        helloWorld();`;

  const result = await splitter.splitText(code);
  console.log(result);
  //   'function helloWorld() {\n' +
  //   '          console.log("Hello, World!");\n' +
  //   '          }\n' +
  //   '          // Call the function\n' +
  //   '          helloWorld();'
};

execute();

const splitter2 = new CharacterTextSplitter({
  chunkSize: 32,
  chunkOverlap: 0,
  separators: " ",
});

const executeSplitter2 = async () => {
  const code = `function helloWorld() {
          console.log("Hello, World!");
          }
          // Call the function
          helloWorld();`;

  const result = await splitter2.splitText(code);
  console.log(result);

  //   'function helloWorld() {',
  //   'console.log("Hello,',
  //   'World!");',
  //   '}',
  //   '// Call the function',
  //   'helloWorld();'
};

executeSplitter2();

//To split content form doc.
const splitDocs = await splitter.splitDocuments(rawCS229Docs);

console.log(splitDocs.slice(0, 5));
