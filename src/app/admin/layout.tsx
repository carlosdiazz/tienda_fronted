import { auth } from "@/auth";
import {
  AppSidebar,
  Breadcrumb,
  BreadcrumbList,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components";

import { AppRouter } from "@/config";

import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect(`${AppRouter.login}`);
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />

              <Breadcrumb>
                <BreadcrumbList></BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
