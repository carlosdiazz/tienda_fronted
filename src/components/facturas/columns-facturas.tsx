"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { ColumnDef } from "@tanstack/react-table";
import {  Edit, Eye } from "lucide-react";

//Propio
import {Badge,  Button, ClienteInterface, FacturaInterface, Switch, TableCell, useFacturaStore } from "@/components";
import { AppRouter, PermisoAccion } from "@/config";

import { PermisoClient } from "../common";

import { SortedIcon } from "../common/data-table";
import { formatoMonedaRD } from "@/lib";
import { removeFacturaAction } from "@/actions";

export const columnsFacturas: ColumnDef<FacturaInterface>[] = [
  {
    accessorKey: "codigo_factura",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Codigo
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const codigo_factura: number = row.getValue(
        "codigo_factura"
      );
      return <Badge variant={"secondary"}>{codigo_factura}</Badge>;
    },
  },

  {
    accessorKey: "cliente",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const cliente: ClienteInterface = row.getValue(
        "cliente"
      );
      return <span>{ cliente.name}</span>;
    },
  },

  {
    accessorKey: "metodo_pago",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Metodo de pago
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
  },

  {
      accessorKey: "total",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total
            <SortedIcon isSorted={column.getIsSorted()} />
          </Button>
        );
      },
      cell: ({ row }) => {
        const total: number = row.getValue("total");
        const new_total=formatoMonedaRD(total)
        return <Badge variant={"secondary"}>{new_total}</Badge>;
      },
  },
    
  {
    accessorKey: "total_pagado",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total pagado
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const total_pagado: number = row.getValue("total_pagado");
      const new_total=formatoMonedaRD(total_pagado)
      return <Badge variant={"secondary"}>{new_total}</Badge>;
    },
  },

  {
    accessorKey: "faltante",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         Faltante
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const faltante: number = row.getValue("faltante");
      const new_faltante=formatoMonedaRD(faltante)
      return <Badge variant={"secondary"}>{new_faltante}</Badge>;
    },
  },

  {
    accessorKey: "is_credito",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         Status
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const is_credito: boolean = row.getValue("is_credito");

      return <Badge variant={is_credito?"destructive":"default"}>{is_credito?"Credito":"Pagada"}</Badge>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const factura = row.original;
      return (
        <TableCell className="flex space-x-2">
          <ButtonDeleteFactura id={factura.id} />
          <Link href={`${AppRouter.adminFactura}/${factura.id}`}>
            <Button variant={"secondary"}>
              <Eye/>
            </Button>
          </Link>
        </TableCell>
      );
    },
  },
];

export const ButtonDeleteFactura = ({ id }: { id: number }) => {
  const [isLoading, setIsLoading] = useState(false);

  const getFactura = useFacturaStore((state) => state.getFactura);

  const onDelete = async () => {
    setIsLoading(true);
    const resp = await removeFacturaAction(id);

    if (resp.error) {
      toast.error(resp.message);
      setIsLoading(false);
    } else {
      await getFactura(1000, null, null, true);
      setIsLoading(false);
      toast.success(resp.message);
    }
  };

  return (
    <PermisoClient permiso={PermisoAccion.FACTURA_DELETE}>
      <Button
        variant="destructive"
        disabled={isLoading}
        onClick={onDelete}
        size={"icon"}
      >
        X
      </Button>
    </PermisoClient>
  );
};
