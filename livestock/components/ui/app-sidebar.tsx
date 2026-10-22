"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Milk,
  Map,
  User,
  Heart,
  Users,
  Sprout,
  Syringe,
  Shield,
  Wheat,
  Calendar,
  Dna,
  AlertTriangle,
  Baby,
  Scale,
  Stethoscope,
  Activity,
  PawPrint,
} from "lucide-react";
import { Cow, Grains } from "@phosphor-icons/react";
import { Collapsible } from "@/components/ui/collapsible";
import { usePathname } from "next/navigation";

const activeClasses =
  "rounded-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 data-[active=true]:bg-gray-100 data-[active=true]:text-gray-900 data-[active=true]:font-semibold relative data-[active=true]:before:absolute data-[active=true]:before:left-0 data-[active=true]:before:top-1/2 data-[active=true]:before:-translate-y-1/2 data-[active=true]:before:h-5 data-[active=true]:before:w-[3px] data-[active=true]:before:rounded-full data-[active=true]:before:bg-blue-600";

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path);
  };

  return (
    <TooltipProvider delayDuration={0}>
      <Sidebar
        collapsible="icon"
        className="border-r bg-white text-gray-800"
      >
        {/* 👇 pt-4 para que no choque con el logo */}
        <SidebarContent className="flex min-h-0 text-gray-800 px-2 pt-15 group-data-[collapsible=icon]:px-0 overflow-y-auto">
          {/* ================= SECCIÓN 1: GESTIÓN DE BOVINOS ================= */}
          <div className="px-3 py-2 mt-2 group-data-[collapsible=icon]:px-0">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider group-data-[collapsible=icon]:justify-center">
              <Cow size={14} />
              <span className="group-data-[collapsible=icon]:hidden">
                Gestión de Bovinos
              </span>
            </div>
          </div>

          {/* Módulo Bovinos */}
          <Collapsible defaultOpen={isActive("/dashboard/cattle")}>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/cattle")}
                  className={activeClasses}
                  tooltip="Bovino"
                >
                  <a href="/dashboard/cattle">
                    <Cow />
                    <span>Bovino</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </Collapsible>

          {/* Módulo Pesaje */}
          <Collapsible defaultOpen={isActive("/dashboard/weighing")}>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/weighing")}
                  className={activeClasses}
                  tooltip="Pesaje"
                >
                  <a href="/dashboard/weighing">
                    <Scale />
                    <span>Pesaje</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </Collapsible>

          {/* Módulo Nacimientos */}
          <Collapsible defaultOpen={isActive("/dashboard/birth")}>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/birth")}
                  className={activeClasses}
                  tooltip="Nacimiento"
                >
                  <a href="/dashboard/birth">
                    <Baby />
                    <span>Parto</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </Collapsible>

          {/* Módulo Mortalidad */}
          <Collapsible defaultOpen={isActive("/dashboard/mortality")}>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/mortality")}
                  className={activeClasses}
                  tooltip="Mortalidad"
                >
                  <a href="/dashboard/mortality">
                    <AlertTriangle />
                    <span>Salida</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </Collapsible>

          {/* Módulo Raza */}
          <Collapsible defaultOpen={isActive("/dashboard/race")}>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/race")}
                  className={activeClasses}
                  tooltip="Raza"
                >
                  <a href="/dashboard/race">
                    <PawPrint />
                    <span>Raza</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </Collapsible>

          {/* Separador */}
          <div className="my-2 border-t border-gray-200 mx-3 group-data-[collapsible=icon]:mx-2" />

          {/* ================= SECCIÓN 2: ALIMENTACIÓN ================= */}
          <div className="px-3 py-2 mt-2 group-data-[collapsible=icon]:px-0">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider group-data-[collapsible=icon]:justify-center">
              <Grains size={14} />
              <span className="group-data-[collapsible=icon]:hidden">
                Gestión de Alimentación
              </span>
            </div>
          </div>

          {/* Módulo Nutrición */}
          <Collapsible defaultOpen={isActive("/dashboard/nutrition")}>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/nutrition")}
                  className={activeClasses}
                  tooltip="Nutrición"
                >
                  <a href="/dashboard/nutrition">
                    <Sprout />
                    <span>Nutrición</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </Collapsible>

          {/* Módulo Alimento */}
          <Collapsible defaultOpen={isActive("/dashboard/food")}>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/food")}
                  className={activeClasses}
                  tooltip="Alimento"
                >
                  <a href="/dashboard/food">
                    <Wheat />
                    <span>Alimento</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </Collapsible>

          {/* Separador */}
          <div className="my-2 border-t border-gray-200 mx-3 group-data-[collapsible=icon]:mx-2" />

          {/* ================= SECCIÓN 3: SANIDAD ================= */}
          <div className="px-3 py-2 mt-2 group-data-[collapsible=icon]:px-0">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider group-data-[collapsible=icon]:justify-center">
              <Stethoscope size={14} />
              <span className="group-data-[collapsible=icon]:hidden">
                Sanidad
              </span>
            </div>
          </div>

          {/* Módulo Vacunación */}
          <Collapsible defaultOpen={isActive("/dashboard/vacunation")}>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/vacunation")}
                  className={activeClasses}
                  tooltip="Vacunación"
                >
                  <a href="/dashboard/vacunation">
                    <Syringe />
                    <span>Vacunación</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </Collapsible>

          {/* Módulo Tratamiento */}
          <Collapsible defaultOpen={isActive("/dashboard/treatment")}>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/treatment")}
                  className={activeClasses}
                  tooltip="Tratamiento"
                >
                  <a href="/dashboard/treatment">
                    <Shield />
                    <span>Tratamiento</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </Collapsible>

          {/* Separador */}
          <div className="my-2 border-t border-gray-200 mx-3 group-data-[collapsible=icon]:mx-2" />

          {/* ================= SECCIÓN 4: REPRODUCCIÓN ================= */}
          <div className="px-3 py-2 mt-2 group-data-[collapsible=icon]:px-0">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider group-data-[collapsible=icon]:justify-center">
              <Heart size={14} />
              <span className="group-data-[collapsible=icon]:hidden">
                Reproducción
              </span>
            </div>
          </div>

          {/* Módulo Inseminación Artificial */}
          <Collapsible
            defaultOpen={isActive("/dashboard/artificialInsemination")}
          >
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/artificialInsemination")}
                  className={activeClasses}
                  tooltip="Inseminación Artificial"
                >
                  <a href="/dashboard/artificialInsemination">
                    <Dna />
                    <span>Inseminación Artificial</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </Collapsible>

          {/* Módulo Monta Natural */}
          <Collapsible defaultOpen={isActive("/dashboard/mount")}>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/mount")}
                  className={activeClasses}
                  tooltip="Monta Natural"
                >
                  <a href="/dashboard/mount">
                    <Calendar />
                    <span>Monta Natural</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </Collapsible>

          {/* Separador */}
          <div className="my-2 border-t border-gray-200 mx-3 group-data-[collapsible=icon]:mx-2" />

          {/* ================= SECCIÓN 5: MONITOREO ================= */}
          <div className="px-3 py-2 mt-2 group-data-[collapsible=icon]:px-0">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider group-data-[collapsible=icon]:justify-center">
              <Activity size={14} />
              <span className="group-data-[collapsible=icon]:hidden">
                Monitoreo
              </span>
            </div>
          </div>

          {/* Módulo Producción de leche */}
          <Collapsible defaultOpen={isActive("/dashboard/milk")}>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/milk")}
                  className={activeClasses}
                  tooltip="Producción de Leche"
                >
                  <a href="/dashboard/milk">
                    <Milk />
                    <span>Producción de leche</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </Collapsible>

          {/* Módulo Potreros */}
          <Collapsible defaultOpen={isActive("/dashboard/pasture")}>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/pasture")}
                  className={activeClasses}
                  tooltip="Potrero"
                >
                  <a href="/dashboard/pasture">
                    <Map />
                    <span>Potrero</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </Collapsible>

          {/* Módulo Usuarios */}
          <Collapsible defaultOpen={isActive("/dashboard/user")}>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/user")}
                  className={activeClasses}
                  tooltip="Usuario"
                >
                  <a href="/dashboard/user">
                    <User />
                    <span>Usuario</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </Collapsible>

          {/* Módulo Responsables */}
          <Collapsible defaultOpen={isActive("/dashboard/responsible")}>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/responsible")}
                  className={activeClasses}
                  tooltip="Responsable"
                >
                  <a href="/dashboard/responsible">
                    <Users />
                    <span>Responsable</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </Collapsible>
        </SidebarContent>
      </Sidebar>
    </TooltipProvider>
  );
}