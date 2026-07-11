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

export function AppSidebar() {
  return (
    <Sidebar variant="inset" collapsible="icon" className="relative flex flex-col h-full w-64 border-r bg-blue-700 text-white">
      <SidebarContent className="bg-blue-700 text-white">
        {/* Módulo Bovinos */}
        <Collapsible defaultOpen={false} className="group/collapsible">
          <SidebarMenu>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="text-white hover:text-white hover:bg-blue-600">
                <SidebarMenuButton className="hover:bg-blue-600">
                  <Icon iconNode={cowHead} size={20} />
                  <span>Bovino</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white">
                      <span>Crear bovino</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white">
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
                <SidebarMenuButton className="hover:bg-blue-600">
                  <Map size={20} />
                  <span>Potrero</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white">
                      <span>Crear potrero</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white">
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
                <SidebarMenuButton className="hover:bg-blue-600">
                  <Sprout size={20} />
                  <span>Nutricion</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white">
                      <span>Crear nutricion</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white">
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
                <SidebarMenuButton className="hover:bg-blue-600">
                  <Syringe size={20} />
                  <span>Salud</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white">
                      <span>Crear vacunacion</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white">
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
                <SidebarMenuButton className="hover:bg-blue-600">
                  <Heart size={20} />
                  <span>Reproduccion</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white">
                      <span>Crear monta</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white">
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
                <SidebarMenuButton className="hover:bg-blue-600">
                  <Milk size={20} />
                  <span>Producción de leche</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white">
                      <span>Crear producción</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white">
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
                <SidebarMenuButton className="hover:bg-blue-600">
                  <Users   size={20} />
                  <span>Responsable</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white">
                      <span>Crear responsable</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white">
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
                <SidebarMenuButton className="hover:bg-blue-600">
                  <User size={20} />
                  <span>Usuario</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white">
                      <span>Crear usuario</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="hover:bg-blue-600 text-white hover:text-white">
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
                <SidebarMenuButton className="w-full hover:bg-blue-600">
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