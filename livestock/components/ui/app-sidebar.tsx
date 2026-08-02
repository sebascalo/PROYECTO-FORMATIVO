'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "@/components/ui/sidebar"
import { 
  ChevronDown, 
  Milk, 
  Map, 
  User, 
  Icon,
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
  Activity
} from "lucide-react"
import { Cow, Grains } from '@phosphor-icons/react';
import { cowHead } from '@lucide/lab';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useRouter } from 'next/navigation';

export function AppSidebar() {
  const router = useRouter();
  return (
    <Sidebar variant="inset" collapsible="icon" className="relative flex flex-col h-full w-64 border-r bg-blue2 text-white">
      <SidebarContent className="bg-blue2 text-white">
        
        {/* ================= SECCIÓN 1: GESTIÓN DE BOVINOS ================= */}
        <div className="px-3 py-2 mt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-wider">
            <Cow size={14} />
            <span>Gestión de Bovinos</span>
          </div>
        </div>

        {/* Módulo Bovinos */}
        <Collapsible defaultOpen={false} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className="hover:bg-blue-600 cursor-pointer">
                  <Icon iconNode={cowHead} size={20} />
                  <span>Bovino</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton 
                      className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                      onClick={() => router.push('/dashboard/cattle/createCattle')}
                    >
                      <span>Crear bovino</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton 
                      className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                      onClick={() => router.push('/dashboard/cattle/listCattle')}
                    >
                      <span>Listar bovinos</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </SidebarMenu>
        </Collapsible>

        {/* Módulo Pesaje */}
        <Collapsible defaultOpen={false} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className="hover:bg-blue-600 cursor-pointer">
                  <Scale size={20} />
                  <span>Pesaje</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                      onClick={() => router.push('/dashboard/weighing/createWeighing')}>
                      <span>Registrar pesaje</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                      onClick={() => router.push('/dashboard/weighing/listWeighing')}>
                      <span>Listar pesajes</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </SidebarMenu>
        </Collapsible>

        {/* Módulo Nacimientos */}
        <Collapsible defaultOpen={false} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className="hover:bg-blue-600 cursor-pointer">
                  <Baby size={20} />
                  <span>Nacimiento</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                      onClick={() => router.push('/dashboard/reproduction/birth/createNacimiento')}>
                      <span>Registrar nacimiento</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                      onClick={() => router.push('/dashboard/reproduction/birth/listNacimiento')}>
                      <span>Listar nacimientos</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </SidebarMenu>
        </Collapsible>

        {/* Módulo Mortalidad */}
        <Collapsible defaultOpen={false} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className="hover:bg-blue-600 cursor-pointer">
                  <AlertTriangle size={20} />
                  <span>Mortalidad</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                      onClick={() => router.push('/dashboard/health/mortality/createMortality')}>
                      <span>Registrar mortalidad</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                      onClick={() => router.push('/dashboard/health/mortality/listMortality')}>
                      <span>Listar mortalidades</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </SidebarMenu>
        </Collapsible>

        {/* Separador */}
        <div className="my-2 border-t border-blue-600/30 mx-3" />

        {/* ================= SECCIÓN 2: COMIDAS ================= */}
        <div className="px-3 py-2 mt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-wider">
            <Grains size={14} />
            <span>Gestion de alimentacion</span>
          </div>
        </div>

        {/* Módulo Nutricion */}
        <Collapsible defaultOpen={false} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className="hover:bg-blue-600 cursor-pointer">
                  <Sprout size={20} />
                  <span>Nutricion</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                      onClick={() => router.push('/dashboard/nutrition/createNutrition')}>
                      <span>Crear nutricion</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                      onClick={() => router.push('/dashboard/nutrition/listNutrition')}>
                      <span>Listar nutriciones</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </SidebarMenu>
        </Collapsible>

        {/* Módulo Alimento */}
        <Collapsible defaultOpen={false} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className="hover:bg-blue-600 cursor-pointer">
                  <Wheat size={20} />
                  <span>Alimento</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                      onClick={() => router.push('/dashboard/feed/createFeed')}>
                      <span>Crear alimento</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                      onClick={() => router.push('/dashboard/feed/listFeed')}>
                      <span>Listar alimentos</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </SidebarMenu>
        </Collapsible>

        {/* Separador */}
        <div className="my-2 border-t border-blue-600/30 mx-3" />

        {/* ================= SECCIÓN 3: SANIDAD ================= */}
        <div className="px-3 py-2 mt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-wider">
            <Stethoscope size={14} />
            <span>Sanidad</span>
          </div>
        </div>

        {/* Módulo Vacunación */}
        <Collapsible defaultOpen={false} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className="hover:bg-blue-600 cursor-pointer">
                  <Syringe size={20} />
                  <span>Vacunación</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                      onClick={() => router.push('/dashboard/health/createVacunation')}>
                      <span>Crear vacunación</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                      onClick={() => router.push('/dashboard/health/listVacunation')}>
                      <span>Listar vacunaciones</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </SidebarMenu>
        </Collapsible>

        {/* Módulo Tratamiento */}
        <Collapsible defaultOpen={false} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className="hover:bg-blue-600 cursor-pointer">
                  <Shield size={20} />
                  <span>Tratamiento</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                      onClick={() => router.push('/dashboard/treatment/createTreatment')}>
                      <span>Crear tratamiento</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                      onClick={() => router.push('/dashboard/treatment/listTreatment')}>
                      <span>Listar tratamientos</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </SidebarMenu>
        </Collapsible>

        {/* Separador */}
        <div className="my-2 border-t border-blue-600/30 mx-3" />

        {/* ================= SECCIÓN 4: REPRODUCCIÓN ================= */}
        <div className="px-3 py-2 mt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-wider">
            <Heart size={14} />
            <span>Reproducción</span>
          </div>
        </div>

        {/* Módulo Inseminación Artificial */}
        <Collapsible defaultOpen={false} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className="hover:bg-blue-600 cursor-pointer">
                  <Dna size={20} />
                  <span>Inseminación Artificial</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                      onClick={() => router.push('/dashboard/artificialInsemination/createArtificialInsemination')}>
                      <span>Crear inseminación</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                      onClick={() => router.push('/dashboard/artificialInsemination/listArtificialInsemination')}>
                      <span>Listar inseminaciones</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </SidebarMenu>
        </Collapsible>

        {/* Módulo Monta Natural */}
        <Collapsible defaultOpen={false} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className="hover:bg-blue-600 cursor-pointer">
                  <Calendar size={20} />
                  <span>Monta Natural</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                      onClick={() => router.push('/dashboard/reproduction/natural/createMonta')}>
                      <span>Crear monta</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                      onClick={() => router.push('/dashboard/reproduction/natural/listMonta')}>
                      <span>Listar montas</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </SidebarMenu>
        </Collapsible>

        {/* Separador */}
        <div className="my-2 border-t border-blue-600/30 mx-3" />

        {/* ================= SECCIÓN 5: MONITOREO ================= */}
        <div className="px-3 py-2 mt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-wider">
            <Activity size={14} />
            <span>Monitoreo</span>
          </div>
        </div>

        {/* Módulo Producción de leche */}
        <Collapsible defaultOpen={false} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className="hover:bg-blue-600 cursor-pointer">
                  <Milk size={20} />
                  <span>Producción de leche</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                      onClick={() => router.push('/dashboard/milk/createMilk')}>
                      <span>Crear producción</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                      onClick={() => router.push('/dashboard/milk/listMilk')}>
                      <span>Listar producciones</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </SidebarMenu>
        </Collapsible>

        {/* Módulo Potreros */}
        <Collapsible defaultOpen={false} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className="hover:bg-blue-600 cursor-pointer">
                  <Map size={20} />
                  <span>Potrero</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                    onClick={() => router.push('/dashboard/pasture/createPasture')}>
                      <span>Crear potrero</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                    onClick={() => router.push('/dashboard/pasture/listPasture')}>
                      <span>Listar potreros</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </SidebarMenu>
        </Collapsible>

        {/* Módulo Usuarios */}
        <Collapsible defaultOpen={false} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className="hover:bg-blue-600 cursor-pointer">
                  <User size={20} />
                  <span>Usuario</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                      onClick={() => router.push('/dashboard/user/createUser')}>
                      <span>Crear usuario</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                      onClick={() => router.push('/dashboard/user/listUser')}>
                      <span>Listar usuarios</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </SidebarMenu>
        </Collapsible>

        {/* Módulo Responsables */}
        <Collapsible defaultOpen={false} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className="hover:bg-blue-600 cursor-pointer">
                  <Users size={20} />
                  <span>Responsable</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                      onClick={() => router.push('/dashboard/responsible/createResponsible')}>
                      <span>Crear responsable</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                      onClick={() => router.push('/dashboard/responsible/listResponsible')}>
                      <span>Listar responsables</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </SidebarMenu>
        </Collapsible>

      </SidebarContent>
    </Sidebar>
  )
}