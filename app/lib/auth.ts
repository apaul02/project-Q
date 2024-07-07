import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { signIn } from "next-auth/react";
import prisma from "@/db";




export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Number',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "abc@example.com"},
        password: { label: "Password", type: "password"}
      },
      async authorize(credentials: any){
        const existingUser = await prisma.user.findFirst({
          where: {
            email : credentials.email
          }
        })
        if(!existingUser){
          return null
        }
        const passwordvalidation = await bcrypt.compare(credentials.password, existingUser.password);
        if(passwordvalidation){
          return{
            id : existingUser.id.toString(),
            name: existingUser.name,
            email: existingUser.email 
          }
        }else{
          return null;
        } 
      },

    })
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({token, session}: any) {
      session.user.id = token.sub

      return session
    }
  },
  // pages: {
  //   signIn: "/signin"
  // }
}