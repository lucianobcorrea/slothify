import {
    SidebarInset,
    SidebarProvider,
  } from "@/components/ui/sidebar"
import { AppSidebar } from "@/ui/admin/component/sidebar/app-sidebar.component";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
