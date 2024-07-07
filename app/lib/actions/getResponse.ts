"use server"

import { model } from "@/config"
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

export async function getResponse(prompt: string){
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
