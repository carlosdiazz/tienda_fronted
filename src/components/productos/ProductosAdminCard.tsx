"use client";

import { useEffect } from "react";

import { AppRouter, PermisoAccion } from "@/config";
import { PermisoClient } from "../common";
import { useProductosStore } from "./productos.store";
import { AdminCard } from "../admin";

export const ProductosAdminCard = () => {
  const productos = useProductosStore((state) => state.productos);
  const getProductos = useProductosStore((state) => state.getProductos);

  useEffect(() => {
    getProductos(1000, true);
  }, []);

  return (
    <PermisoClient permiso={PermisoAccion.PRODUCTOS_VIEW}>
      <AdminCard
        title="Productos"
        descripcion="Productos Creadas"
        total={productos.length}
        href={AppRouter.adminProductos}
        permiso={PermisoAccion.PRODUCTOS_CREATE}
      />
    </PermisoClient>
  );
};
