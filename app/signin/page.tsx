import { getServerSession } from "next-auth";
import { Signin } from "../components/Signin";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";

export default async function(){
  const session = await getServerSession(authOptions);
  if(session?.user?.id){
    redirect('/')
  }
  return <div>
    <Signin />
  </div>
}