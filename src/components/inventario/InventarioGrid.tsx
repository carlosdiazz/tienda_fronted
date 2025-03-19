"use client";

import { DataTableCommon } from "../common";
import { columnsInevntario } from "./columns-inventario";
import { InventarioInterface } from "./inventario.interface";

interface Props {
  inventarios: InventarioInterface[];
}

export const InventarioGrid = ({ inventarios }: Props) => {
  return (
    <div className="container mx-auto ">
      <DataTableCommon columns={columnsInevntario} data={inventarios} view_filter={ false} />
    </div>
  );
};
