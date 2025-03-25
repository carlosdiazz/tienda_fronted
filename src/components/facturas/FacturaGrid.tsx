"use client";

import { DataTableCommon } from "../common";

import { FacturaInterface } from "./factura.interface";

import { columnsFacturas } from "./columns-facturas";
import { generateFacturaReportPDF } from "./generar-pdf-productos";
import { Button } from "../ui";

interface Props {
  facturas: FacturaInterface[];
}

export const FacturaGrid = ({ facturas }: Props) => {
  const handlePrint = () => {
    generateFacturaReportPDF(facturas);
  };

  return (
    <div className="container mx-auto flex flex-col">
      <Button
        variant={"default"}
        className="mt-4 self-end"
        onClick={handlePrint}
      >
        Imprimir Reporte de Factura
      </Button>
      <DataTableCommon
        columns={columnsFacturas}
        data={facturas}
        view_filter={false}
      />
    </div>
  );
};
