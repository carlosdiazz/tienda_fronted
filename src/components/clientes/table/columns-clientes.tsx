"use client";

import { ClienteInterface, PermisoClient } from "@/components";
import { Button, Switch } from "@/components/ui";
import { AppRouter, PermisoAccion } from "@/config";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { ColumnDef, SortDirection } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";
import Link from "next/link";


const SortedIcon = ({ isSorted }: { isSorted: SortDirection | false }) => {
  if (isSorted === "asc") {
    return <ChevronUpIcon className="h-4 w-4" />;
  }
  if (isSorted === "desc") {
    return <ChevronDownIcon className="h-4 w-4" />;
  }

  return <ArrowUpDown className="ml-2 h-4 w-4" />;
};

export const columnsClientes: ColumnDef<ClienteInterface>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
  },
  {
    accessorKey: "tipo_documento",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo Documento
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
  },
  {
    accessorKey: "documento",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Documento
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
  },
  {
    accessorKey: "telefono",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Telefono
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
  },
  {
    accessorKey: "activo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Activo
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const active: boolean = row.getValue("activo");
      return <Switch checked={active} />;
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div/>
      );
    },
    cell: ({ row }) => {
      const id: number = row.getValue("id");

      return (
        <PermisoClient permiso={PermisoAccion.CLIENTE_VIEW}>
          <Link href={`${AppRouter.adminClientes}/${id}`}>
            <Button variant="secondary">
              <Eye />
            </Button>
          </Link>
        </PermisoClient>
      );
    },
  },
];
