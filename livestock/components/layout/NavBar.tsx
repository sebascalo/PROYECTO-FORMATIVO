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
    <nav className="h-[70px] relative w-full px-2 md:px-6 lg:px-10 xl:px-16 flex items-center justify-between z-30 bg-gradient-nav transition-all">
      <div className="flex items-center gap-1">
        <Image src={logo} alt="Logo" width={50} height={50} />
        <Link href="/" className="flex items-center gap-1">
          <span className="text-fond font-bold text-3xl tracking-wide cursor-pointer hover:text-fond transition">
            Livestock
          </span>
        </Link>
      </div>

      {/* desktop menu */}
      <div className="hidden sm:flex items-center gap-8">
        <ul className="text-white md:flex hidden items-center gap-10">
          <li>
            <Link className="text-fond hover:text-fond transition" href="/">
              Inicio
            </Link>
          </li>
          <li>
            <Link
              className="text-fond hover:text-fond transition"
              href="/Contacto"
            >
              Contacto
            </Link>
          </li>
          <li>
            <Link
              className="text-fond hover:text-fond transition"
              href="/Nosotros"
            >
              Nosotros
            </Link>
          </li>
        </ul>
        <Login
          Textbutton="Iniciar sesión"
          style="cursor-pointer bg-fond text-title hover:bg-fond hover:text-title transition-all w-40 h-11 rounded-full"
        />
      </div>

      {/* mobile menu */}
      <button
        onClick={MostrarMenu}
        aria-label="menu"
        type="button"
        className="menu-btn inline-block md:hidden active:scale-90 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="#ffffff"
        >
          <path d="M3 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2z" />
        </svg>
      </button>

      {/* mobile menu dropdown */}
      <div
        className={`${openMenu ? "flex" : "hidden"} absolute top-[70px] left-0 w-full bg-gradient-nav p-6 md:hidden`}
      >
        <ul className="flex flex-col space-y-4 text-fond text-lg">
          <li>
            <Link href="/" className="text-sm hover:text-fond transition">
              Inicio
            </Link>
          </li>
          <li>
            <Link
              href="/Contacto"
              className="text-sm hover:text-fond transition"
            >
              Contacto
            </Link>
          </li>
          <li>
            <Link
              href="/Nosotros"
              className="text-sm hover:text-fond transition"
            >
              Nosotros
            </Link>
          </li>
          <Login
            Textbutton="Iniciar sesión"
            style="cursor-pointer bg-fond text-title hover:bg-fond hover:text-title transition-all w-40 h-11 rounded-full"
          />
        </ul>
      </div>
    </nav>
  );
}
