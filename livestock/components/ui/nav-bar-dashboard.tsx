"use client";
import logo from "@/public/LOGO-LIVESTOCK.png";
import Image from "next/image";

export default function NavBarDashboard() {
  return (
<nav className="h-[60px] relative w-full px-2 md:px-6 lg:px-10 xl:px-16 flex items-center justify-between z-30 bg-gradient-nav transition-all">
      <div className="flex items-center gap-1">
        <Image src={logo} alt="Logo" width={50} height={50} />
        <span className="text-fond font-bold text-3xl tracking-wide">
          Livestock
        </span>
      </div>
    </nav>
  );
}
