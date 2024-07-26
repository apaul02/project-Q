"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@/db";

export async function getUserData(){
  const session = await getServerSession(authOptions);
  if(!session?.user?.id){
    return;
  }
  let userId = session?.user?.id
  const user = await prisma.user.findUnique({
    where: {
      id : Number(userId)
    },
    select: {
      id: true,
      username: true,
      email: true,
      coins: true,
      apikey: true,
      referralCode: true,
      name: true
    }
  })
  if(!user){
    return;
  }
  return user;
}