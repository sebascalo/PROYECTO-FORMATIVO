"use client";
import logo from "@/public/LOGO-LIVESTOCK.png";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { 
  User, 
  Bell, 
  LogOut,
  ChevronDown
} from "lucide-react"

export default function NavBarDashboard() {
  return (
    <nav className="h-[60px] relative w-full px-2 md:px-6 lg:px-10 xl:px-16 flex items-center justify-between z-30 bg-gradient-nav transition-all">
      {/* Logo - Izquierda */}
      <div className="flex items-center gap-1">
        <Image src={logo} alt="Logo" width={50} height={50} />
        <span className="text-fond font-bold text-3xl tracking-wide">
          Livestock
        </span>
      </div>

      {/* Menú de usuario - Derecha */}
      <div className="flex items-center gap-2">
        {/* Dropdown de usuario */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="text-white hover:text-white data-[state=open]:text-white hover:bg-blue-800/50 data-[state=open]:bg-blue-800/50 gap-2 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium">sebastian</span>
                  <span className="text-xs text-white/60">livestocklagranja@gmail.com</span>
                </div>
                <ChevronDown size={16} className="hidden md:block" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="w-56" 
            align="end"
            side="bottom"
            sideOffset={8}
          >
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              <span>Notificaciones</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}