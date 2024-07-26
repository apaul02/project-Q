import Signup from "../components/Signup";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function(){
  const session = await getServerSession(authOptions);
  if(session?.user?.id){
    redirect('/')
  }
  return<div>
    <Signup />
  </div>
}