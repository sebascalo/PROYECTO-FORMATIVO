"use client";
import cachos from "@/public/cachos.png";
import livestockAzul from "@/public/livestockAzul.png";
import Image from "next/image";

export default function NavBarDashboard(){
  return (
    <nav className="h-[60px] relative w-full px-2 md:px-6 lg:px-10 xl:px-16 flex items-center justify-between z-30 bg-gradient-to-r from-blue-500 to-blue-700 transition-all">
        <div className="flex items-center gap-1">
            <Image src={cachos} alt="Logo" width={50} height={50}/>
            <Image src={livestockAzul} alt="Logo" width={150} height={50} className="cursor-pointer"/>
        </div>
    </nav>
  );
}