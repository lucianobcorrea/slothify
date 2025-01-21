import AdminLayout from "@/ui/admin/layouts/admin.layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect } from "react";
import { useGetChallenges } from "@/hook/admin/challenge/useGetChallenges/useGetChallenges.hook";
import { columns } from "./table/columns.component";
import { DataTable } from "./table/data-table.component";
import { LoadingSpinner } from "@/ui/index";

export function IndexChallenge() {
  const { challenges, fetchChallenges, loadingChallenges } = useGetChallenges();

  useEffect(() => {
    fetchChallenges();
  }, []);

  return (
    <AdminLayout>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin/dashboard">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Challenges</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {!loadingChallenges ? (
          <DataTable columns={columns} data={challenges} />
        ) : (
          <LoadingSpinner className="text-primary-color" size={46} />
        )}
      </div>
    </AdminLayout>
  );
}
