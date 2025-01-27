"use client";

import { useEffect } from "react";

import { AppRouter, PermisoAccion } from "@/config";
import { PermisoClient } from "../common";

import { AdminCard } from "../admin";
import { useInventarioStore } from "./inventario-store";




export const InventarioAdminCard = () => {
  const Inventario = useInventarioStore((state) => state.inventarios);
  const getInventario = useInventarioStore((state) => state.getInventarios);

  useEffect(() => {
    getInventario(1000, true);
  }, []);

  return (
    <PermisoClient permiso={PermisoAccion.INVENTARIO_VIEW}>
      <AdminCard
        title="Inventario"
        descripcion="Inventario Creados"
        total={Inventario.length}
        href={AppRouter.adminInventario}
        permiso={PermisoAccion.INVENTARIO_CREATE}
      />
    </PermisoClient>
  );
};
