"use client";
import Login from "@/components/auth/Login";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/LOGO-LIVESTOCK.png";

export default function NavBar() {
  const [openMenu, setOpenMenu] = React.useState(false);
  const MostrarMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <nav className="h-[70px] relative w-full px-2 md:px-6 lg:px-10 xl:px-2 flex items-center justify-between z-30 bg-slate-50 border-b border-slate-200 shadow-sm">
      <div className="flex items-center gap-1">
        <Image src={logo} alt="Logo" width={50} height={50} />
        <Link href="/" className="flex items-center gap-1">
          <span className="text-[#2B7FFF] font-bold text-3xl tracking-wide cursor-pointer">
            Livestock
          </span>
        </Link>
      </div>

      {/* desktop menu */}
      <div className="hidden sm:flex items-center gap-8">
        <ul className="text-slate-800 md:flex hidden items-center gap-10">
          <li>
            <Link
              className="text-slate-800 hover:text-[#2B7FFF] transition-colors duration-200"
              href="/"
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              className="text-slate-800 hover:text-[#2B7FFF] transition-colors duration-200"
              href="/Contacto"
            >
              Contacto
            </Link>
          </li>
          <li>
            <Link
              className="text-slate-800 hover:text-[#2B7FFF] transition-colors duration-200"
              href="/Nosotros"
            >
              Nosotros
            </Link>
          </li>
        </ul>
        <Login
          Textbutton="Iniciar sesión"
          style="cursor-pointer bg-[#2B7FFF] text-white w-40 h-11 rounded-full hover:bg-[#1E63CC] transition-colors duration-300"
        />
      </div>

      {/* mobile menu */}
      <button
        onClick={MostrarMenu}
        aria-label="menu"
        type="button"
        className="menu-btn inline-block md:hidden active:scale-90"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="#2B7FFF"
        >
          <path d="M3 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2z" />
        </svg>
      </button>

      {/* mobile menu dropdown */}
      <div
        className={`${openMenu ? "flex" : "hidden"} absolute top-[70px] left-0 w-full bg-slate-50 shadow-lg border-b border-slate-200 p-6 md:hidden`}
      >
        <ul className="flex flex-col space-y-4 text-slate-800 text-lg w-full">
          <li>
            <Link
              href="/"
              className="text-slate-800 hover:text-[#2B7FFF] transition-colors duration-200"
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              href="/Contacto"
              className="text-slate-800 hover:text-[#2B7FFF] transition-colors duration-200"
            >
              Contacto
            </Link>
          </li>
          <li>
            <Link
              href="/Nosotros"
              className="text-slate-800 hover:text-[#2B7FFF] transition-colors duration-200"
            >
              Nosotros
            </Link>
          </li>
          <li>
            <Login
              Textbutton="Iniciar sesión"
              style="cursor-pointer bg-[#2B7FFF] text-white w-40 h-11 rounded-full hover:bg-[#1E63CC] transition-colors duration-300"
            />
          </li>
        </ul>
      </div>
    </nav>
  );
}