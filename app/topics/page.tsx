import { getServerSession } from "next-auth";
import Topics from "../components/Topics";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";

export default async function(){
  const session = await getServerSession(authOptions);
  if(!session?.user?.id){
    redirect('/signin')
  }
  return <div>
    <Topics />
  </div>
}