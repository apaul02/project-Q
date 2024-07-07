const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",
  generationConfig: { responseMimeType: "application/json" },
  systemInstruction: `I am going to give you a paragraph or the name of the topic, generate me multiple choice types questions(minimum 10, max 20) like
  {
    question: { "type": "string" },
    choice1: { "type": "string" },
    choice2: { "type": "string" },
    choice3: { "type": "string" },
    choice4: { "type": "string" },
    answer: { "type": "string" },
  } FOR ANSWER STRICTLY MENTION CHOICE'S NUMBER ONLY.`
});

export interface McqItem {
  question: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  answer: string;
}