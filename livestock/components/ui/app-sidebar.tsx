'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  ChevronDown, 
  Milk, 
  Map, 
  User, 
  Bell, 
  LogOut,
  Icon,
  Heart,
  Users,
  Sprout,
  Syringe
} from "lucide-react"
import { cowHead } from '@lucide/lab';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useRouter } from 'next/navigation';

export function AppSidebar() {
  const router = useRouter();
  return (
    <Sidebar variant="inset" collapsible="icon" className="relative flex flex-col h-full w-64 border-r bg-blue2 text-white">
      <SidebarContent className="bg-blue2 text-white">
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

        {/* Módulo salud */}
        <Collapsible defaultOpen={false} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className="hover:bg-blue-600 cursor-pointer">
                  <Syringe size={20} />
                  <span>Salud</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                      onClick={() => router.push('/dashboard/health/createVacunation')}>
                      <span>Crear vacunacion</span>
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

        {/* Módulo Reproduccion */}
        <Collapsible defaultOpen={false} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className="hover:bg-blue-600 cursor-pointer">
                  <Heart size={20} />
                  <span>Reproduccion</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                      onClick={() => router.push('/dashboard/reproduction/createReproduction')}>
                      <span>Crear monta</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white cursor-pointer"
                      onClick={() => router.push('/dashboard/reproduction/listReproduction')}>
                      <span>Listar montas</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </SidebarMenu>
        </Collapsible>

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

        {/* Módulo responsables */}
        <Collapsible defaultOpen={false} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className="hover:bg-blue-600 cursor-pointer">
                  <Users   size={20} />
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

      </SidebarContent>

      {/* Footer con usuario */}
      <SidebarFooter className="bg-blue-700 text-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full hover:bg-blue-600 cursor-pointer">
                  <User className="h-4 w-4" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">shadcn</span>
                    <span className="text-xs text-muted-foreground">m@example.com</span>
                  </div>
                  <ChevronDown className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" side="top" align="end">
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}