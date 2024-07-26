"use server"

import prisma from "@/db"
import { UserSchema } from "@/typs"
import bcrypt from "bcrypt"
import { nanoid } from 'nanoid'

export type SignupResult = {
  message?: string;
  error?: string;
  referralCode?: string | null
};

export async function signup(name: string, email: string, username: string, password: string, referral?: string): Promise<SignupResult> {
  try {
    const validateUser = UserSchema.safeParse({email, username, name, password});
    if (!validateUser.success) {
      console.log("Validation Failed", validateUser.error.flatten().fieldErrors);
      return {
        message: "Validation failed",
        error: `Validation Error ${JSON.stringify(validateUser.error.flatten().fieldErrors)}`
      };
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { username: username }
        ]
      }
    });

    if (existingUser) {
      console.log("Email or username already taken");
      return {
        message: "Email or username already taken",
        error: "Email or username already taken"
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const referralCode = nanoid(8); // Generate a unique referral code

    let referrerUser;
    if (referral) {
      referrerUser = await prisma.user.findUnique({
        where: { referralCode: referral }
      });

      if (referrerUser) {
        // Update referrer's coins (e.g., add 50 coins for successful referral)
        await prisma.user.update({
          where: { id: referrerUser.id },
          data: { coins: { increment: 50 } }
        });
      }
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: hashedPassword,
        referralCode,
        referral: referral || null,
        coins: referral && referrerUser ? 10 : 0 // Give 10 coins to new user if they used a valid referral
      }
    });

    if (user) {
      console.log("User created");
      return {
        message: "User successfully created",
        referralCode: user.referralCode
      };
    }

    // If we somehow get here without creating a user or throwing an error
    return {
      message: "Failed to create user",
      error: "Unknown error occurred"
    };

  } catch (e) {
    console.log(e);
    return {
      message: "Error occurred",
      error: `${e}`
    };
  }
}