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
import { useRouter, usePathname } from 'next/navigation'; // Importar usePathname

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname(); // Obtener la ruta actual

  // Función para verificar si una ruta está activa
  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path);
  };

  return (
    <Sidebar variant="inset" collapsible="icon" className="relative flex flex-col h-full w-64 border-r bg-blue2 text-white">
      <SidebarContent className="bg-blue2 text-white">
        
        {/* ================= SECCIÓN 1: GESTIÓN DE BOVINOS ================= */}
        <div className="px-3 py-2 mt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-wider group-data-[collapsible=icon]:justify-center">
            <Cow size={14} />
            <span className="group-data-[collapsible=icon]:hidden">Gestión de Bovinos</span>
          </div>
        </div>

        {/* Módulo Bovinos */}
        <Collapsible defaultOpen={isActive('/dashboard/cattle')} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className={`hover:bg-blue-600 cursor-pointer group-data-[collapsible=icon]:justify-center ${
                  isActive('/dashboard/cattle') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                }`}>
                  <Icon iconNode={cowHead} size={20} />
                  <span className="group-data-[collapsible=icon]:hidden">Bovino</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[collapsible=icon]:hidden group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="group-data-[collapsible=icon]:hidden">
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton 
                      className={`hover:bg-blue-600 text-white hover:text-white cursor-pointer ${
                        isActive('/dashboard/cattle/createCattle') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                      }`}
                      onClick={() => router.push('/dashboard/cattle/createCattle')}
                    >
                      <span>Crear bovino</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton 
                      className={`hover:bg-blue-600 text-white hover:text-white cursor-pointer ${
                        isActive('/dashboard/cattle/listCattle') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                      }`}
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
        <Collapsible defaultOpen={isActive('/dashboard/weighing')} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className={`hover:bg-blue-600 cursor-pointer group-data-[collapsible=icon]:justify-center ${
                  isActive('/dashboard/weighing') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                }`}>
                  <Scale size={20} />
                  <span className="group-data-[collapsible=icon]:hidden">Pesaje</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[collapsible=icon]:hidden group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="group-data-[collapsible=icon]:hidden">
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className={`hover:bg-blue-600 text-white hover:text-white cursor-pointer ${
                      isActive('/dashboard/weighing/createWeighing') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                    }`}
                      onClick={() => router.push('/dashboard/weighing/createWeighing')}>
                      <span>Crear pesaje</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className={`hover:bg-blue-600 text-white hover:text-white cursor-pointer ${
                      isActive('/dashboard/weighing/listWeighing') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                    }`}
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
        <Collapsible defaultOpen={isActive('/dashboard/birth')} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className={`hover:bg-blue-600 cursor-pointer group-data-[collapsible=icon]:justify-center ${
                  isActive('/dashboard/birth') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                }`}>
                  <Baby size={20} />
                  <span className="group-data-[collapsible=icon]:hidden">Nacimiento</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[collapsible=icon]:hidden group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="group-data-[collapsible=icon]:hidden">
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className={`hover:bg-blue-600 text-white hover:text-white cursor-pointer ${
                      isActive('/dashboard/birth/crearBirth') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                    }`}
                      onClick={() => router.push('/dashboard/birth/crearBirth')}>
                      <span>Crear nacimiento</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className={`hover:bg-blue-600 text-white hover:text-white cursor-pointer ${
                      isActive('/dashboard/birth/listarBirth') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                    }`}
                      onClick={() => router.push('/dashboard/birth/listarBirth')}>
                      <span>Listar nacimientos</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </SidebarMenu>
        </Collapsible>

        {/* Módulo Mortalidad */}
        <Collapsible defaultOpen={isActive('/dashboard/mortality')} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className={`hover:bg-blue-600 cursor-pointer group-data-[collapsible=icon]:justify-center ${
                  isActive('/dashboard/mortality') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                }`}>
                  <AlertTriangle size={20} />
                  <span className="group-data-[collapsible=icon]:hidden">Mortalidad</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[collapsible=icon]:hidden group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="group-data-[collapsible=icon]:hidden">
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className={`hover:bg-blue-600 text-white hover:text-white cursor-pointer ${
                      isActive('/dashboard/mortality/crearMortality') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                    }`}
                      onClick={() => router.push('/dashboard/mortality/crearMortality')}>
                      <span>Crear mortalidad</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className={`hover:bg-blue-600 text-white hover:text-white cursor-pointer ${
                      isActive('/dashboard/mortality/listarMortality') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                    }`}
                      onClick={() => router.push('/dashboard/mortality/listarMortality')}>
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
          <div className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-wider group-data-[collapsible=icon]:justify-center">
            <Grains size={14} />
            <span className="group-data-[collapsible=icon]:hidden">Gestion de alimentacion</span>
          </div>
        </div>

        {/* Módulo Nutricion */}
        <Collapsible defaultOpen={isActive('/dashboard/nutrition')} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className={`hover:bg-blue-600 cursor-pointer group-data-[collapsible=icon]:justify-center ${
                  isActive('/dashboard/nutrition') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                }`}>
                  <Sprout size={20} />
                  <span className="group-data-[collapsible=icon]:hidden">Nutricion</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[collapsible=icon]:hidden group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="group-data-[collapsible=icon]:hidden">
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className={`hover:bg-blue-600 text-white hover:text-white cursor-pointer ${
                      isActive('/dashboard/nutrition/createNutrition') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                    }`}
                      onClick={() => router.push('/dashboard/nutrition/createNutrition')}>
                      <span>Crear nutricion</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className={`hover:bg-blue-600 text-white hover:text-white cursor-pointer ${
                      isActive('/dashboard/nutrition/listNutrition') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                    }`}
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
        <Collapsible defaultOpen={isActive('/dashboard/food')} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className={`hover:bg-blue-600 cursor-pointer group-data-[collapsible=icon]:justify-center ${
                  isActive('/dashboard/food') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                }`}>
                  <Wheat size={20} />
                  <span className="group-data-[collapsible=icon]:hidden">Alimento</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[collapsible=icon]:hidden group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="group-data-[collapsible=icon]:hidden">
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className={`hover:bg-blue-600 text-white hover:text-white cursor-pointer ${
                      isActive('/dashboard/food/createFood') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                    }`}
                      onClick={() => router.push('/dashboard/food/createFood')}>
                      <span>Crear alimento</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className={`hover:bg-blue-600 text-white hover:text-white cursor-pointer ${
                      isActive('/dashboard/food/listFood') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                    }`}
                      onClick={() => router.push('/dashboard/food/listFood')}>
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
          <div className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-wider group-data-[collapsible=icon]:justify-center">
            <Stethoscope size={14} />
            <span className="group-data-[collapsible=icon]:hidden">Sanidad</span>
          </div>
        </div>

        {/* Módulo Vacunación */}
        <Collapsible defaultOpen={isActive('/dashboard/vacunation')} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className={`hover:bg-blue-600 cursor-pointer group-data-[collapsible=icon]:justify-center ${
                  isActive('/dashboard/vacunation') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                }`}>
                  <Syringe size={20} />
                  <span className="group-data-[collapsible=icon]:hidden">Vacunación</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[collapsible=icon]:hidden group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="group-data-[collapsible=icon]:hidden">
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className={`hover:bg-blue-600 text-white hover:text-white cursor-pointer ${
                      isActive('/dashboard/vacunation/createVacunation') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                    }`}
                      onClick={() => router.push('/dashboard/vacunation/createVacunation')}>
                      <span>Crear vacunación</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className={`hover:bg-blue-600 text-white hover:text-white cursor-pointer ${
                      isActive('/dashboard/vacunation/listVacunation') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                    }`}
                      onClick={() => router.push('/dashboard/vacunation/listVacunation')}>
                      <span>Listar vacunaciones</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </SidebarMenu>
        </Collapsible>

        {/* Módulo Tratamiento */}
        <Collapsible defaultOpen={isActive('/dashboard/treatment')} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className={`hover:bg-blue-600 cursor-pointer group-data-[collapsible=icon]:justify-center ${
                  isActive('/dashboard/treatment') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                }`}>
                  <Shield size={20} />
                  <span className="group-data-[collapsible=icon]:hidden">Tratamiento</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[collapsible=icon]:hidden group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="group-data-[collapsible=icon]:hidden">
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className={`hover:bg-blue-600 text-white hover:text-white cursor-pointer ${
                      isActive('/dashboard/treatment/createTreatment') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                    }`}
                      onClick={() => router.push('/dashboard/treatment/createTreatment')}>
                      <span>Crear tratamiento</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className={`hover:bg-blue-600 text-white hover:text-white cursor-pointer ${
                      isActive('/dashboard/treatment/listTreatment') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                    }`}
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
          <div className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-wider group-data-[collapsible=icon]:justify-center">
            <Heart size={14} />
            <span className="group-data-[collapsible=icon]:hidden">Reproducción</span>
          </div>
        </div>

        {/* Módulo Inseminación Artificial */}
        <Collapsible defaultOpen={isActive('/dashboard/artificialInsemination')} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className={`hover:bg-blue-600 cursor-pointer group-data-[collapsible=icon]:justify-center ${
                  isActive('/dashboard/artificialInsemination') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                }`}>
                  <Dna size={20} />
                  <span className="group-data-[collapsible=icon]:hidden">Inseminación Artificial</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[collapsible=icon]:hidden group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="group-data-[collapsible=icon]:hidden">
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className={`hover:bg-blue-600 text-white hover:text-white cursor-pointer ${
                      isActive('/dashboard/artificialInsemination/createArtificialInsemination') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                    }`}
                      onClick={() => router.push('/dashboard/artificialInsemination/createArtificialInsemination')}>
                      <span>Crear inseminación</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className={`hover:bg-blue-600 text-white hover:text-white cursor-pointer ${
                      isActive('/dashboard/artificialInsemination/listArtificialInsemination') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                    }`}
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
        <Collapsible defaultOpen={isActive('/dashboard/mount')} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className={`hover:bg-blue-600 cursor-pointer group-data-[collapsible=icon]:justify-center ${
                  isActive('/dashboard/mount') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                }`}>
                  <Calendar size={20} />
                  <span className="group-data-[collapsible=icon]:hidden">Monta Natural</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[collapsible=icon]:hidden group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="group-data-[collapsible=icon]:hidden">
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className={`hover:bg-blue-600 text-white hover:text-white cursor-pointer ${
                      isActive('/dashboard/mount/createMount') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                    }`}
                      onClick={() => router.push('/dashboard/mount/createMount')}>
                      <span>Crear monta</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className={`hover:bg-blue-600 text-white hover:text-white cursor-pointer ${
                      isActive('/dashboard/mount/listMount') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                    }`}
                      onClick={() => router.push('/dashboard/mount/listMount')}>
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
          <div className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-wider group-data-[collapsible=icon]:justify-center">
            <Activity size={14} />
            <span className="group-data-[collapsible=icon]:hidden">Monitoreo</span>
          </div>
        </div>

        {/* Módulo Producción de leche */}
        <Collapsible defaultOpen={isActive('/dashboard/milk')} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className={`hover:bg-blue-600 cursor-pointer group-data-[collapsible=icon]:justify-center ${
                  isActive('/dashboard/milk') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                }`}>
                  <Milk size={20} />
                  <span className="group-data-[collapsible=icon]:hidden">Producción de leche</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[collapsible=icon]:hidden group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="group-data-[collapsible=icon]:hidden">
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className={`hover:bg-blue-600 text-white hover:text-white cursor-pointer ${
                      isActive('/dashboard/milk/createMilk') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                    }`}
                      onClick={() => router.push('/dashboard/milk/createMilk')}>
                      <span>Crear producción</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className={`hover:bg-blue-600 text-white hover:text-white cursor-pointer ${
                      isActive('/dashboard/milk/listMilk') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                    }`}
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
        <Collapsible defaultOpen={isActive('/dashboard/pasture')} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className={`hover:bg-blue-600 cursor-pointer group-data-[collapsible=icon]:justify-center ${
                  isActive('/dashboard/pasture') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                }`}>
                  <Map size={20} />
                  <span className="group-data-[collapsible=icon]:hidden">Potrero</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[collapsible=icon]:hidden group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="group-data-[collapsible=icon]:hidden">
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className={`hover:bg-blue-600 text-white hover:text-white cursor-pointer ${
                      isActive('/dashboard/pasture/createPasture') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                    }`}
                    onClick={() => router.push('/dashboard/pasture/createPasture')}>
                      <span>Crear potrero</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className={`hover:bg-blue-600 text-white hover:text-white cursor-pointer ${
                      isActive('/dashboard/pasture/listPasture') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                    }`}
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
        <Collapsible defaultOpen={isActive('/dashboard/user')} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className={`hover:bg-blue-600 cursor-pointer group-data-[collapsible=icon]:justify-center ${
                  isActive('/dashboard/user') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                }`}>
                  <User size={20} />
                  <span className="group-data-[collapsible=icon]:hidden">Usuario</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[collapsible=icon]:hidden group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="group-data-[collapsible=icon]:hidden">
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className={`hover:bg-blue-600 text-white hover:text-white cursor-pointer ${
                      isActive('/dashboard/user/createUser') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                    }`}
                      onClick={() => router.push('/dashboard/user/createUser')}>
                      <span>Crear usuario</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className={`hover:bg-blue-600 text-white hover:text-white cursor-pointer ${
                      isActive('/dashboard/user/listUser') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                    }`}
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
        <Collapsible defaultOpen={isActive('/dashboard/responsible')} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className={`hover:bg-blue-600 cursor-pointer group-data-[collapsible=icon]:justify-center ${
                  isActive('/dashboard/responsible') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                }`}>
                  <Users size={20} />
                  <span className="group-data-[collapsible=icon]:hidden">Responsable</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[collapsible=icon]:hidden group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="group-data-[collapsible=icon]:hidden">
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className={`hover:bg-blue-600 text-white hover:text-white cursor-pointer ${
                      isActive('/dashboard/responsible/createResponsible') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                    }`}
                      onClick={() => router.push('/dashboard/responsible/createResponsible')}>
                      <span>Crear responsable</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className={`hover:bg-blue-600 text-white hover:text-white cursor-pointer ${
                      isActive('/dashboard/responsible/listResponsible') ? 'bg-white text-blue2 hover:bg-white hover:text-blue2' : ''
                    }`}
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