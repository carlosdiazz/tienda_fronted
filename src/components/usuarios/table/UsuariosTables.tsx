"use client";
import React from "react";
import { UsuarioInterface } from "../usuario.interface";
import { DataTableUsuarios } from "./DataTableUsuarios";
import { columnsUsuarios } from "./columns-usuarios";

interface Props {
  usuarios: UsuarioInterface[];
}

export const UsuariosTables = ({ usuarios }: Props) => {
  return (
    <div className="container mx-auto">
      <DataTableUsuarios columns={columnsUsuarios} data={usuarios} />
    </div>
  );
};
