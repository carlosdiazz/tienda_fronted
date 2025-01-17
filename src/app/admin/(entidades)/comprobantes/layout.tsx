export const revalidate = 1; // Se actialixara cada segundo

import { AppRouter, PermisoAccion } from "@/config";
import { permisoServer } from "@/lib";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Comprobante",
  description: "Pagina para crear nuevos Comprobante",
};

export default async function ComprobanteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ver = await permisoServer(PermisoAccion.COMPROBANTE_VIEW);
  if (!ver) {
    redirect(AppRouter.adminComprobante)
  };

  return <div>{children}</div>;
}
