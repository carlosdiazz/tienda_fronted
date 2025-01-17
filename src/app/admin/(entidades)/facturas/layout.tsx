export const revalidate = 1; // Se actialixara cada segundo

import { AppRouter, PermisoAccion } from "@/config";
import { permisoServer } from "@/lib";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Factura",
  description: "Pagina para crear nuevas Factura",
};

export default async function FacturaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ver = await permisoServer(PermisoAccion.FACTURA_VIEW);
  if (!ver) {
    redirect(AppRouter.adminFactura)
  };

  return <div>{children}</div>;
}
