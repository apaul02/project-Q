import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";
import DonatePage from "../components/Donate";

export default async function(){
  const session = await getServerSession(authOptions);
  if(!session?.user?.id){
    redirect('/signin')
  }
  return <div>
    <DonatePage />
  </div>
}