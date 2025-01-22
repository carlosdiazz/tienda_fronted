"use client";

import {
  ClienteInterface,
  emptyFacturaFormVentas,
  LoadingPage,
  ProductoInterface,
  useCLienteStore,
  useProductosStore,
  VentasForm,
} from "@/components";
import { useEffect } from "react";

export default function InventarioPage() {
  //Clientes
  const clientes: ClienteInterface[] = useCLienteStore(
    (state) => state.clientes
  );
  const loadingClientes: boolean = useCLienteStore((state) => state.loading);
  const getClientes = useCLienteStore((state) => state.getClientes);

  //Productos
  const productos: ProductoInterface[] = useProductosStore(
    (state) => state.productos
  );
  const loadingProductos: boolean = useProductosStore((state) => state.loading);
  const getProductos = useProductosStore((state) => state.getProductos);

  useEffect(() => {
    getClientes(1000, true);
    getProductos(1000, true);
  }, []);

  if (loadingClientes || loadingProductos) {
    return <LoadingPage/>
  }

  return (
    <div>
      <VentasForm
        facturaForm={emptyFacturaFormVentas}
        clientes={clientes}
        productos={productos}
      />
    </div>
  );
}
