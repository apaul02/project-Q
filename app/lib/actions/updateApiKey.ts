import prisma from "@/db";

export async function updateApiKey(userId: string,apiKey: string){
  const existingUser = await prisma.user.findFirst({
    where: {
      id: Number(userId)
    }
  })
  if(existingUser){
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