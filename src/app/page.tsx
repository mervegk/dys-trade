import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Index from "@/components/dashboard/Index";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/giris-yap");
  }
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <Index />
    </div>
  );
}
