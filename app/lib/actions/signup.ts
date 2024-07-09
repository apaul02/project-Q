"use server"

import prisma from "@/db"
import { UserSchema } from "@/typs"
import bcrypt from "bcrypt"

export async function signup(name: string, email: string, username: string, password: string ){
  try{
    const validateUser = UserSchema.safeParse({email, username, name, password});
    if(!validateUser.success){
      console.log("Validation Falied", validateUser.error.flatten().fieldErrors);
      return {
        message : "Validation falied",
        error : `Validation Error ${validateUser.error.flatten().fieldErrors}`
      }
    }
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email
      }
    })
    if(existingUser){
      console.log("Email already taken")
      return{
        message : "Email Already Taken",
        error : "Email Already Taken"
      }
    }

    const existingUserName = await prisma.user.findFirst({
      where: {
        username: username
      }
    })
    if(existingUserName){
      console.log("username taken")
      return {
        message : "Username Already taken",
        error : "Username Already taken"
      }
    }
    const hashedpassword = await bcrypt.hash(password, 10);
  
      const user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          username: username,
          password: hashedpassword
        }
      })
      if(user){
        console.log("User created");
        return {
          message : "User successfully created"
        }
      }
  }catch(e){
    console.log(e);
    return{
      message : `Error occoured`,
      error : `${e}`
    }
  }
}