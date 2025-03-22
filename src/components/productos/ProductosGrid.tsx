"use client";

import { DataTableCommon } from "../common";

import { ProductoInterface } from "./producto.interface";

import { columnsProductos } from "./productos-columns";

interface Props {
  productos: ProductoInterface[];
}

export const ProductosGrid = ({ productos }: Props) => {
  return (
    <div className="container mx-auto ">
      <DataTableCommon columns={columnsProductos} data={productos} />
    </div>
  );
};
