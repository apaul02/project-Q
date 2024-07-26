"use server"
import prisma from "@/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function updateApiKey(apiKey: string){
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id;
  const existingUser = await prisma.user.findFirst({
    where: {
      id: Number(userId)
    }
  })
  if(!existingUser){
    return {
      message : "User not found"
    }
  }
  const result = await prisma.user.update({
    where: {
      id : Number(userId)
    },
    data: {
      apikey : apiKey
    }
  })
  if(!result){
    return{
      message : "Updating falied"
    }
  }else{
    return{
      message : "Update Successful"
    }
  }
  
}