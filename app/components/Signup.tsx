"use client"
import { signIn } from "next-auth/react"
import { signup } from "../lib/actions/signup"
import { Button } from "./Button"
import { useRouter } from "next/navigation"


export function Signup(){
  const router = useRouter();
  async function handleSignup(){
    //get inputs from inputBoxes and pass them to this function use state vars
    signup("Ankan", "ankan@gmail.com", "1234", "ankan")
    const result = await signIn("credentials", {
      email :  "ankan@gmail.com",
      password : "1234",
      redirect : false
    });
    if(result?.error){
      console.log("Sigin failed", result.error);
      return;
    }else{
      console.log("SignIn Successful", result);
      router.push('/');
    }
  }
  return<div>
    <Button onClick={handleSignup}>Do it</Button>
  </div>
}