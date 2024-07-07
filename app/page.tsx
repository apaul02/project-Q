"use client"
import { useState } from "react";
import { TextInput } from "./components/TextInput";
import { Button } from "./components/Button";
import { getResponse } from "./lib/actions/getResponse";
import { McqItem } from "@/config";

export default function Home() {
  async function handleButton(){
    const response = await getResponse(prompt);
    setResponse(response);
  }
  const[prompt, setPrompt] = useState("");
  const[response, setResponse] = useState<McqItem[]>([]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <TextInput onChange={(value) => setPrompt(value)} placeholder={"Ask Something"} label={"Hi How are you today"}></TextInput>
    <Button onClick={handleButton}>Go!</Button>
    <div>
      {response && <p>{response.map(data => <PrintMcqs question={data.question} choice1={data.choice1} choice2={data.choice2} choice3={data.choice3} choice4={data.choice4} answer={data.answer}/>)}</p>}
      
    </div>  
    </main>
  );
}

export function PrintMcqs({question, choice1, choice2, choice3, choice4, answer}: {question: string, choice1: string,choice2: string, choice3: string,choice4: string, answer: string}){
return <div>
  <div>
    (Q) {question}
  </div>
  <div>
    1. {choice1}
  </div>
  <div>
    2. {choice2}
  </div>
  <div>
    3. {choice3}
  </div>
  <div>
    4. {choice4}
  </div>
  <div>
    Answer. {answer}
  </div>
  <br></br>
</div>  
}


