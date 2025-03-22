"use client";
import React from "react";
import { EmpresaInterface } from "../empresa.interface";
import { DataTableEmpleados } from "./DataTableEmpleados";
import { columnsEmpleados } from "./columns-empleados";
import { generateEmpleadosReportPDF } from "../generar-pdf-empleados";
import { Button } from "@/components/ui";

interface Props {
  empleados: EmpresaInterface[];
}

export const EmpleadosTables = ({ empleados }: Props) => {
  const handlePrint = () => {
    generateEmpleadosReportPDF(empleados);
  };

  return (
    <div className="container mx-auto flex flex-col">
      <Button
        variant={"default"}
        className="mt-4 self-end"
        onClick={handlePrint}
      >
        Imprimir Reporte de Empleados
      </Button>
      <DataTableEmpleados columns={columnsEmpleados} data={empleados} />
    </div>
  );
};
