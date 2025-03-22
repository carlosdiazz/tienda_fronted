"use client";

import { DataTableCommon } from "../common";

import { ProveedorInterface } from "./proveedor.interface";

import { columnsProvedores } from "./columns-proveedores";
import { Button } from "../ui";
import { generateProvedoresReportPDF } from "./generar-pdf-empleados";

interface Props {
  proveedores: ProveedorInterface[];
}

export const ProveedorGrid = ({ proveedores }: Props) => {
  const handlePrint = () => {
    generateProvedoresReportPDF(proveedores);
  };

  return (
    <div className="container mx-auto flex flex-col">
      <Button
        variant={"default"}
        className="mt-4 self-end"
        onClick={handlePrint}
      >
        Imprimir Reporte de Proveedores
      </Button>
      <DataTableCommon columns={columnsProvedores} data={proveedores} />
    </div>
  );
};
