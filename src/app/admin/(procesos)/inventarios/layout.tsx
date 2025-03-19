export const revalidate = 1; // Se actialixara cada segundo

import { AppRouter, PermisoAccion } from "@/config";
import { permisoServer } from "@/lib";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Almacen",
  description: "Pagina para crear Inventario",
};

export default async function InventarioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ver = await permisoServer(PermisoAccion.INVENTARIO_VIEW);
  if (!ver) {
    redirect(AppRouter.adminHome);
  }

  return <div>{children}</div>;
}
