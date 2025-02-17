"use client";

import { useEffect } from "react";

import { AppRouter, PermisoAccion } from "@/config";
import { PermisoClient } from "../common";

import { AdminCard } from "../admin";
import { useFacturaStore } from "./factura.store";


export const FacturaAdminCard = () => {
  const factura = useFacturaStore((state) => state.factura);
  const getFactura = useFacturaStore((state) => state.getFactura);

  useEffect(() => {
    getFactura(1000, true, null);
  }, []);

  return (
    <PermisoClient permiso={PermisoAccion.PRODUCTOS_VIEW}>
      <AdminCard
        title="Factura"
        descripcion="Factura Creadas"
        total={factura.length}
        href={AppRouter.adminFactura}
        permiso={PermisoAccion.FACTURA_CREATE}
      />
    </PermisoClient>
  );
};
