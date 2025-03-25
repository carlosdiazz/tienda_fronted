"use client";

import { DataTableCommon } from "../common";
import { Button } from "../ui";
import { generateProductosReportPDF } from "./generar-pdf-productos";

import { ProductoInterface } from "./producto.interface";

import { columnsProductos } from "./productos-columns";

interface Props {
  productos: ProductoInterface[];
}

export const ProductosGrid = ({ productos }: Props) => {
  const handlePrint = () => {
    generateProductosReportPDF(productos);
  };
  return (
    <div className="container mx-auto flex flex-col">
      <Button
        variant={"default"}
        className="mt-4 self-end"
        onClick={handlePrint}
      >
        Imprimir Reporte de Productos
      </Button>
      <DataTableCommon columns={columnsProductos} data={productos} />
    </div>
  );
};
