"use client";
import { useState } from "react";
import logo from "@/public/LOGO-LIVESTOCK.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, ChevronDown, UserCircle, KeyRound } from "lucide-react";
import FormProfile from "../profile/formProfile";
import FormChangePassword from "../profile/formChangePassword";

export default function NavBarDashboard() {
  const router = useRouter();
  
  // 👇 Estados para abrir/cerrar los modales
  const [profileOpen, setProfileOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.replace("/");
  };

  return (
    <>
      <nav className="h-[60px] relative w-full px-2 md:px-6 lg:px-10 xl:px-2 flex items-center justify-between z-30 bg-slate-50 border-b border-slate-200 shadow-sm">
        {/* Logo - Izquierda */}
        <div className="flex items-center gap-1">
          <Image src={logo} alt="Logo" width={50} height={50} />
          <span className="text-[#2B7FFF] font-bold text-3xl tracking-wide">
            Livestock
          </span>
        </div>

        {/* Menú de usuario - Derecha */}
        <div className="flex items-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-slate-800 hover:bg-slate-100 transition-colors duration-200 outline-none focus:outline-none focus-visible:outline-none"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  <UserCircle size={20} className="text-[#2B7FFF]" />
                </div>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium text-slate-800">
                    sebastian
                  </span>
                  <span className="text-xs text-slate-500">
                    livestocklagranja@gmail.com
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className="hidden md:block text-slate-600"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56"
              align="end"
              side="bottom"
              sideOffset={8}
            >
              <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {/* 👇 Usamos onSelect para que abran los modales */}
              <DropdownMenuItem onSelect={() => setProfileOpen(true)}>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem onSelect={() => setPasswordOpen(true)}>
                <KeyRound className="mr-2 h-4 w-4" />
                <span>Cambiar contraseña</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem className="text-red-600" onSelect={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      {/* 👇 Los modales van aquí afuera, no dentro del Dropdown */}
      <FormProfile open={profileOpen} onOpenChange={setProfileOpen} />
      <FormChangePassword open={passwordOpen} onOpenChange={setPasswordOpen} />
    </>
  );
}