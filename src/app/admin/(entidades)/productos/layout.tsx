export const revalidate = 1; // Se actialixara cada segundo

import { AppRouter, PermisoAccion } from "@/config";
import { permisoServer } from "@/lib";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Productos",
  description: "Pagina para crear nuevos productos",
};

export default async function ProductosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ver = await permisoServer(PermisoAccion.PRODUCTOS_VIEW);
  if (!ver) {
    redirect(AppRouter.adminHome)
  };

  return <div>{children}</div>;
}
