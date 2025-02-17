"use client";
import React from "react";
import { EmpresaInterface } from "../empresa.interface";
import { DataTableEmpleados } from "./DataTableEmpleados";
import { columnsEmpleados } from "./columns-empleados";

interface Props {
  empleados: EmpresaInterface[];
}

export const EmpleadosTables = ({ empleados }: Props) => {
  return (
    <div className="container mx-auto">
      <DataTableEmpleados columns={columnsEmpleados} data={empleados} />
    </div>
  );
};
