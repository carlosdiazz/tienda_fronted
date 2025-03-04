"use client";

import { useEffect } from "react";
import { ProductoInterface, useProductosStore } from "../productos";
import { LoadingPage } from "../common";
import { InventarioInterface } from "./inventario.interface";
import { InventarioForm } from "./InventarioForm";
import { ProveedorInterface, useProveedorStore } from "../proveedores";

interface Props {
  inventario: InventarioInterface;
}

export const LoadingForm = ({ inventario }: Props) => {
  //Productos
  const productos: ProductoInterface[] = useProductosStore(
    (state) => state.productos
  );
  const loadingProductos: boolean = useProductosStore((state) => state.loading);
  const getProductos = useProductosStore((state) => state.getProductos);

  //Proveedor
  const loadingProveedor: boolean = useProveedorStore((state) => state.loading);
  const getProveedor = useProveedorStore((state) => state.getProveedores);
  const proveedores: ProveedorInterface[] = useProveedorStore(
    (state) => state.proveedores
  );

  useEffect(() => {
    getProductos(1000, true, false);
    getProveedor(1000, true)
  }, []);

  if (loadingProductos || loadingProveedor) {
    return <LoadingPage />;
  }

  return (
    <div>
      <InventarioForm inventario={inventario} productos={productos} proveedor={proveedores}/>
    </div>
  );
};
