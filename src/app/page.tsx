import Image from "next/image";
import Header from "@/components/dashboard/Header";
import Index from "@/components/dashboard/Index";

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <Index />
    </div>
  );
}
