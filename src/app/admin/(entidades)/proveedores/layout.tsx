export const revalidate = 1; // Se actialixara cada segundo

import { AppRouter, PermisoAccion } from "@/config";
import { permisoServer } from "@/lib";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Proveedores",
  description: "Pagina para crear nuevos Proveedores",
};

export default async function ProveedoresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ver = await permisoServer(PermisoAccion.PROVEEDOR_VIEW);
  if (!ver) {
    redirect(AppRouter.adminHome)
  };

  return <div>{children}</div>;
}
