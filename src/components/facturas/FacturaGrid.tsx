"use client";

import { DataTableCommon } from "../common";

import { FacturaInterface } from "./factura.interface";

import { columnsFacturas } from "./columns-facturas";

interface Props {
  facturas: FacturaInterface[];
}

export const FacturaGrid = ({ facturas }: Props) => {
  return (
    <div className="container mx-auto ">
      <DataTableCommon columns={columnsFacturas} data={facturas} view_filter={false} />
    </div>
  );
};
