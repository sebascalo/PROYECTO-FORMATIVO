"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import NavBarDashboard from "@/components/ui/nav-bar-dashboard";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full flex-col">
                <NavBarDashboard />
                <div className="flex flex-1 overflow-hidden">
                    <AppSidebar />
                    <div className="flex-1 overflow-auto">
                        <SidebarTrigger className="ml-4 mt-2" />
                        <main className="p-6">{children}</main>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}