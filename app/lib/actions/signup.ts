"use server"

import prisma from "@/db"
import bcrypt from "bcrypt"

export async function signup(name: string, email: string, password: string){
  const existingUser = await prisma.user.findFirst({
    where: {
      email: email
    }
  })
  if(existingUser){
    return{
      message : "User already exists"
    }
  }
  const hashedpassword = await bcrypt.hash(password, 10);
  try{
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedpassword
      }
    })
    if(user){
      return {
        message : "User successfully created"
      }
    }
  }catch(e){
    console.log(e);
    return{
      message : "Some error occured"
    }
  }
}