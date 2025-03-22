"use client";
import { Button } from "@/components/ui";
import { ClienteInterface } from "../clientes.interface";
import { generateClientesReportPDF } from "../generar-pdf-clientes";
import { columnsClientes } from "./columns-clientes";
import { DataTableClientes } from "./data-table-clientes";

interface Props {
  clientes: ClienteInterface[];
}

export const ClientesTables = ({ clientes }: Props) => {
  const handlePrint = () => {
    generateClientesReportPDF(clientes);
  };

  return (
    <div className="container mx-auto flex flex-col">
            <Button
        variant={"default"}
        className="mt-4 self-end"
        onClick={handlePrint}
      >
        Imprimir Reporte de Clientes
      </Button>
      <DataTableClientes columns={columnsClientes} data={clientes} />
    </div>
  );
};
