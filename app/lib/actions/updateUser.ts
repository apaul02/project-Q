"use server"

import bcrypt from "bcrypt";
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@/db";

export async function updateUser(
  name?: string, 
  email?: string, 
  newPassword?: string, 
  oldPassword?: string
) {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id;

  if (!userId) {
    return {
      success: false,
      message: "Invalid User"
    }
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId)
      }
    })

    if (!user) {
      return {
        success: false,
        message: "User not found"
      }
    }

    let updateData: any = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;

    if (newPassword && oldPassword) {
      const passwordValidation = await bcrypt.compare(oldPassword, user.password);
      if (!passwordValidation) {
        return {
          success: false,
          message: "Incorrect old password"
        }
      }
      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    if (Object.keys(updateData).length === 0) {
      return {
        success: false,
        message: "No fields to update"
      }
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: Number(userId)
      },
      data: updateData
    });

    return {
      success: true,
      message: "User updated successfully",
      user: updatedUser
    }

  } catch (error) {
    console.error("Error updating user:", error);
    return {
      success: false,
      message: "An error occurred while updating the user"
    }
  }
}