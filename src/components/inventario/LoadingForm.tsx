"use client";

import { useEffect } from "react";
import { ProductoInterface, useProductosStore } from "../productos";
import { LoadingPage } from "../common";
import { InventarioInterface } from "./inventario.interface";
import { InventarioForm } from "./InventarioForm";

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

  useEffect(() => {
    getProductos(1000, true);
  }, []);

  if (loadingProductos) {
    return <LoadingPage />;
  }

  return (
    <div>
      <InventarioForm inventario={inventario} productos={productos} />
    </div>
  );
};
