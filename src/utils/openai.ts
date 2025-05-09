// import OpenAI from "openai";
// import { OPENAI_API_KEY } from "./constants";

// const client = new OpenAI({
//   apiKey: OPENAI_API_KEY, // This is the default and can be omitted
//   dangerouslyAllowBrowser: true,
// });

// const response = await client.responses.create({
//   model: "gpt-4o",
//   instructions: "You are a coding assistant that talks like a pirate",
//   input: "Are semicolons optional in JavaScript?",
// });

// console.log(response.output_text);

import { Ollama } from "ollama";

const client = new Ollama({ host: "http://xhdhran40:11434/" });

export default client;
