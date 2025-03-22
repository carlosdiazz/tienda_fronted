"use client";

import { DataTableCommon } from "../common";

import { ProveedorInterface } from "./proveedor.interface";

import { columnsProvedores } from "./columns-proveedores";

interface Props {
  proveedores: ProveedorInterface[];
}

export const ProveedorGrid = ({ proveedores }: Props) => {
  return (
    <div className="container mx-auto ">
      <DataTableCommon columns={columnsProvedores} data={proveedores} />
    </div>
  );
};
