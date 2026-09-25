"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
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
} from "lucide-react";
import { Cow, Grains } from "@phosphor-icons/react";
import { Collapsible } from "@/components/ui/collapsible";
import { usePathname } from "next/navigation";

const activeClasses =
  " rounded-sm " +
  "text-gray-700 hover:bg-gray-100 hover:text-gray-900 " +
  "data-[active=true]:bg-gray-100 data-[active=true]:text-gray-900 data-[active=true]:font-semibold " +
  "relative " +
  "data-[active=true]:before:absolute " +
  "data-[active=true]:before:left-0 " +
  "data-[active=true]:before:top-1/2 " +
  "data-[active=true]:before:-translate-y-1/2 " +
  "data-[active=true]:before:h-5 " +
  "data-[active=true]:before:w-[3px] " +
  "data-[active=true]:before:rounded-full " +
  "data-[active=true]:before:bg-blue-600";

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path);
  };

  return (
    <Sidebar
      collapsible="icon"
      className="relative flex flex-col h-full w-64 border-r bg-white text-gray-800"
    >
      <SidebarContent className="text-gray-800 px-3">
        {/* ================= SECCIÓN 1: GESTIÓN DE BOVINOS ================= */}
        <div className="px-3 py-2 mt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider group-data-[collapsible=icon]:justify-center">
            <Cow size={14} />
            <span className="group-data-[collapsible=icon]:hidden">
              Gestión de Bovinos
            </span>
          </div>
        </div>

        {/* Módulo Bovinos */}
        <Collapsible
          defaultOpen={isActive("/dashboard/cattle")}
          className="group/collapsible"
        >
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/dashboard/cattle")}
                className={activeClasses}
              >
                <a href="/dashboard/cattle">
                  <Cow /> Bovino
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </Collapsible>

        {/* Módulo Pesaje */}
        <Collapsible
          defaultOpen={isActive("/dashboard/weighing")}
          className="group/collapsible"
        >
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/dashboard/weighing")}
                className={activeClasses}
              >
                <a href="/dashboard/weighing">
                  <Scale /> Pesaje
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </Collapsible>

        {/* Módulo Nacimientos */}
        <Collapsible
          defaultOpen={isActive("/dashboard/birth")}
          className="group/collapsible"
        >
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/dashboard/birth")}
                className={activeClasses}
              >
                <a href="/dashboard/birth">
                  <Baby /> Nacimiento
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </Collapsible>

        {/* Módulo Mortalidad */}
        <Collapsible
          defaultOpen={isActive("/dashboard/mortality")}
          className="group/collapsible"
        >
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/dashboard/mortality")}
                className={activeClasses}
              >
                <a href="/dashboard/mortality">
                  <AlertTriangle /> Mortalidad
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </Collapsible>

        {/* Separador */}
        <div className="my-2 border-t border-gray-200 mx-3" />

        {/* ================= SECCIÓN 2: COMIDAS ================= */}
        <div className="px-3 py-2 mt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider group-data-[collapsible=icon]:justify-center">
            <Grains size={14} />
            <span className="group-data-[collapsible=icon]:hidden">
              Gestion de alimentacion
            </span>
          </div>
        </div>

        {/* Módulo Nutricion */}
        <Collapsible
          defaultOpen={isActive("/dashboard/nutrition")}
          className="group/collapsible"
        >
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/dashboard/nutrition")}
                className={activeClasses}
              >
                <a href="/dashboard/nutrition">
                  <Sprout /> Nutricion
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </Collapsible>

        {/* Módulo Alimento */}
        <Collapsible
          defaultOpen={isActive("/dashboard/food")}
          className="group/collapsible"
        >
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/dashboard/food")}
                className={activeClasses}
              >
                <a href="/dashboard/food">
                  <Wheat /> Alimento
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </Collapsible>

        {/* Separador */}
        <div className="my-2 border-t border-gray-200 mx-3" />

        {/* ================= SECCIÓN 3: SANIDAD ================= */}
        <div className="px-3 py-2 mt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider group-data-[collapsible=icon]:justify-center">
            <Stethoscope size={14} />
            <span className="group-data-[collapsible=icon]:hidden">
              Sanidad
            </span>
          </div>
        </div>

        {/* Módulo Vacunación */}
        <Collapsible
          defaultOpen={isActive("/dashboard/vacunation")}
          className="group/collapsible"
        >
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/dashboard/vacunation")}
                className={activeClasses}
              >
                <a href="/dashboard/vacunation">
                  <Syringe /> Vacunación
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </Collapsible>

        {/* Módulo Tratamiento */}
        <Collapsible
          defaultOpen={isActive("/dashboard/treatment")}
          className="group/collapsible"
        >
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/dashboard/treatment")}
                className={activeClasses}
              >
                <a href="/dashboard/treatment">
                  <Shield /> Tratamiento
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </Collapsible>

        {/* Separador */}
        <div className="my-2 border-t border-gray-200 mx-3" />

        {/* ================= SECCIÓN 4: REPRODUCCIÓN ================= */}
        <div className="px-3 py-2 mt-2">
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
          className="group/collapsible"
        >
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/dashboard/artificialInsemination")}
                className={activeClasses}
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
        <Collapsible
          defaultOpen={isActive("/dashboard/mount")}
          className="group/collapsible"
        >
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/dashboard/mount")}
                className={activeClasses}
              >
                <a href="/dashboard/mount">
                  <Calendar /> Monta Natural
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </Collapsible>

        {/* Separador */}
        <div className="my-2 border-t border-gray-200 mx-3" />

        {/* ================= SECCIÓN 5: MONITOREO ================= */}
        <div className="px-3 py-2 mt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider group-data-[collapsible=icon]:justify-center">
            <Activity size={14} />
            <span className="group-data-[collapsible=icon]:hidden">
              Monitoreo
            </span>
          </div>
        </div>

        {/* Módulo Producción de leche */}
        <Collapsible
          defaultOpen={isActive("/dashboard/milk")}
          className="group/collapsible"
        >
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/dashboard/milk")}
                className={activeClasses}
              >
                <a href="/dashboard/milk">
                  <Milk />
                  <span>Produccion de leche</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </Collapsible>

        {/* Módulo Potreros */}
        <Collapsible
          defaultOpen={isActive("/dashboard/pasture")}
          className="group/collapsible"
        >
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/dashboard/pasture")}
                className={activeClasses}
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
        <Collapsible
          defaultOpen={isActive("/dashboard/user")}
          className="group/collapsible"
        >
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/dashboard/user")}
                className={activeClasses}
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
        <Collapsible
          defaultOpen={isActive("/dashboard/responsible")}
          className="group/collapsible"
        >
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/dashboard/responsible")}
                className={activeClasses}
              >
                <a href="/dashboard/responsible">
                  <Users /> Responsable
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </Collapsible>
      </SidebarContent>
    </Sidebar>
  );
}