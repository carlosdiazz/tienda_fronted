"use client";
import { ClienteInterface } from "../clientes.interface";
import { columnsClientes } from "./columns-clientes";
import { DataTableClientes } from "./data-table-clientes";

interface Props {
  clientes: ClienteInterface[];
}

export const ClientesTables = ({ clientes }: Props) => {
  console.log(clientes);

  return (
    <div className="container mx-auto py-10">
      <DataTableClientes columns={columnsClientes} data={clientes} />
    </div>
  );
};
