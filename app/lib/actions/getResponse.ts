"use server"

import prisma from "@/db";

const { GoogleGenerativeAI } = require("@google/generative-ai");
export interface McqItem {
  question: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  answer: string;
}


export async function getResponse(prompt: string, userId: string){
  const user = await prisma.user.findFirst({
    where: {
      id : Number(userId)
    }
  });
  if(!user){
    return {
      message : "User not found"
    }
  }
  let apiKey = "";
  if(user.apikey){
    apiKey = user.apikey
    console.log("user api key loaded")
  }else{
    apiKey = process.env.API_KEY || ""
    console.log("My api key loaded")
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",
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
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  console.log("__________")
  console.log(typeof text);
  const questionsArray: {
    question: string;
    choice1: string;
    choice2: string;
    choice3: string;
    choice4: string;
    answer: string;
  }[] = JSON.parse(text);
  return questionsArray;
  
}


let arr: any = [
  {
    "question": "What is a key characteristic that distinguishes humans from other species?",
    "choice1": "Simple social structures",
    "choice2": "Limited cognitive abilities",
    "choice3": "Complex societies",
    "choice4": "Lack of adaptability",
    "answer": "Complex societies"
  },
  {
    "question": "Which of the following is NOT an example of human innovation?",
    "choice1": "Development of languages",
    "choice2": "Creation of art",
    "choice3": "Construction of tools",
    "choice4": "Natural ecosystems",
    "answer": "Natural ecosystems"
  },
]