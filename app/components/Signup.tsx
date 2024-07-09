"use client"
import { signIn } from "next-auth/react"
import { signup } from "../lib/actions/signup"
import { Button } from "./Button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { PasswordInput, TextInput } from "./TextInput"


export function Signup(){
  const[name, setName] = useState("");
  const[username, setUserName] = useState("");
  const[password, setPassword] = useState("");
  const[email, setEmail] = useState("");
  // const[error, setError] = useState("");
  const router = useRouter();
  async function handleSignup(){
    //add some logic to check the fields if they r empty or not if yes throw error
    // if(!name || !username || !password || !email){
      
    // }
    try{
      const response = await signup(name, email, username, password)
      if(response?.error){
        console.log("Yo Error from the function");
        console.log(response.error)
        return 
      }
      const result = await signIn("credentials", {
        email :  email,
        password : password,
        redirect : false
      });
      console.log("I am here")
      if(result?.error){
        console.log("Signin failed")
        console.log("Sigin failed", result.error);
        return;
      }else{
        console.log("Success")
        console.log("SignIn Successful", result);
        router.push('/');
      }
    }catch(e){
      console.log(e)
    }
    
    
  }
  return<div>
    <TextInput label={"Name"} placeholder={"Jhon"} onChange={(value) => {setName(value)}} />
    <TextInput label={"Email"} placeholder={"abc@example.com"} onChange={(value) => {setEmail(value)}} />
    <TextInput label={"Username"} placeholder={"username"} onChange={(value) => {setUserName(value)}} />
    <PasswordInput label={"Password"} placeholder={"Min 8 Characters"} onChange={(value) => {setPassword(value)}} />
    <Button onClick={handleSignup}>Sign Up</Button>    
  </div>
}