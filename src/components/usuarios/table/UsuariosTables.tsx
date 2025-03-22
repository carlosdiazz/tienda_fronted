"use client";
import React from "react";
import { UsuarioInterface } from "../usuario.interface";
import { DataTableUsuarios } from "./DataTableUsuarios";
import { columnsUsuarios } from "./columns-usuarios";
import { Button } from "@/components/ui";
import { generateUsuariosReportPDF } from "../generar-pdf-user";

interface Props {
  usuarios: UsuarioInterface[];
}

export const UsuariosTables = ({ usuarios }: Props) => {
  const handlePrint = () => {
    generateUsuariosReportPDF(usuarios);
  };

  return (
    <div className="container mx-auto flex flex-col">
      <Button
        variant={"default"}
        className="mt-4 self-end"
        onClick={handlePrint}
      >
        Imprimir Reporte de Usuarios
      </Button>
      <DataTableUsuarios columns={columnsUsuarios} data={usuarios} />
    </div>
  );
};
