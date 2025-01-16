"use client";

import { useEffect } from "react";

import { AppRouter, PermisoAccion } from "@/config";
import { PermisoClient } from "../common";

import { AdminCard } from "../admin";
import { useProveedorStore } from "./proveedor.store";

export const ProveedorAdminCard = () => {
  const proveedores = useProveedorStore((state) => state.proveedores);
  const getProveedores = useProveedorStore((state) => state.getProveedores);

  useEffect(() => {
    getProveedores(1000, true);
  }, []);

  return (
    <PermisoClient permiso={PermisoAccion.PRODUCTOS_VIEW}>
      <AdminCard
        title="Proveedores"
        descripcion="Proveedores Creados"
        total={proveedores.length}
        href={AppRouter.adminProveedores}
        permiso={PermisoAccion.PROVEEDOR_CREATE}
      />
    </PermisoClient>
  );
};
