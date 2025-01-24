export const revalidate = 1; // Se actialixara cada segundo

import { AppRouter, PermisoAccion } from "@/config";
import { permisoServer } from "@/lib";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Empleados",
  description: "Pagina para crear nuevos Empleados",
};

export default async function RolesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ver = await permisoServer(PermisoAccion.EMPRESA_VIEW);
  if (!ver) {
    redirect(AppRouter.adminHome)
  };

  return <div>{children}</div>;
}
