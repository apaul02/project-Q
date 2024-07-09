"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@/db";

export async function checkAnswer(chosenAnswer: number,rightAnswer :number ){
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if(!userId){
    return {
      message : "Invalid user"
    }
  }
  try{
    if(chosenAnswer === rightAnswer){
      await prisma.user.update({
        where: {
          id : Number(userId)
        },
        data: {
          coins :{
            increment : 1
          }
        }
      })
      return {
        message : "Right Answer",
        response : true
      }
    }else{
      return {
        message : "Wrong Anwer",
        response : false
      }
    }
  }catch(e){
    return {
      message : `Error Occured ${e}`
    }
  }
}