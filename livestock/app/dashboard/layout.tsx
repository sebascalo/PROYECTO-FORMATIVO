"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import NavBarDashboard from "@/components/ui/nav-bar-dashboard"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col">
        <NavBarDashboard />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarTrigger />
            <main className="p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}