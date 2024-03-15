import { GithubRepoLoader } from "langchain/document_loaders/web/github";
// Peer dependency, used to support .gitignore syntax
import ignore from "ignore";

const loader = new GithubRepoLoader(
  "https://github.com/langchain-ai/langchainjs",
  {
    recursive: false,
    ignorePaths: ["*.md", "yarn.lock"],
  }
);

const docs = await loader.load();

console.log(docs.slice(0, 3));
