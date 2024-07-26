import { getServerSession } from "next-auth";
import GeneratePage from "../components/GeneratePage";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";
import DegeneratePage from "../components/Degenrate";

export default async function(){
  const session = await getServerSession(authOptions);
  if(!session?.user?.id){
    redirect('/signin')
  }
  return <div>
    <DegeneratePage />
  </div>
}