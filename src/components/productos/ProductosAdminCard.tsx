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
    getProductos(1000, true,undefined, undefined, "");
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

export const ProductosPocoStockAdminCard = () => {
  const productos_stock_bajo = useProductosStore((state) => state.productos_stock_bajo);
  const get_productos_stock_bajo = useProductosStore((state) => state.get_productos_stock_bajo);

  useEffect(() => {
    get_productos_stock_bajo();
  }, []);

  return (
    <PermisoClient permiso={PermisoAccion.PRODUCTOS_VIEW}>
      <AdminCard
        title="Productos"
        descripcion="Productos Con Poco Stock"
        total={productos_stock_bajo.length}
        href={AppRouter.adminProductos}
        permiso={PermisoAccion.PRODUCTOS_CREATE}
      />
    </PermisoClient>
  );
};
