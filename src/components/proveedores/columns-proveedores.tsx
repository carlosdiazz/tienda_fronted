"use client";
import { useState } from "react";

import { toast } from "sonner";

import { ColumnDef } from "@tanstack/react-table";
import {  Edit } from "lucide-react";

//Propio
import {Badge,  Button,   ProveedorInterface,   Switch,   TableCell, useFacturaStore, useProductosStore, useProveedorStore } from "@/components";
import {  AppRouter, PermisoAccion } from "@/config";

import { PermisoClient } from "../common";

import { SortedIcon } from "../common/data-table";
import Link from "next/link";
import { removeProveedorAction } from "@/actions";


export const columnsProvedores: ColumnDef<ProveedorInterface>[] = [
  
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
  },

  {
    accessorKey: "descripcion",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descripcion
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
  },

  {
    accessorKey: "direccion",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Direccion
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
    id: "actions",
    cell: ({ row }) => {
      const provedor = row.original;
      return (
        <TableCell className="flex space-x-2">
          <ButtonDeleteProovedor id={provedor.id} />
          <PermisoClient permiso={PermisoAccion.PROVEEDOR_UPDATE}>
            <Link href={`${AppRouter.adminProveedores}/${provedor.id}`}>
              <Button variant="secondary" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
          </PermisoClient>
        </TableCell>
      );
    },
  },
];

export const ButtonDeleteProovedor = ({ id }: { id: number }) => {
  const [isLoading, setIsLoading] = useState(false);

  const getProveedores = useProveedorStore((state) => state.getProveedores);

  const onDelete = async () => {
    setIsLoading(true);
    const resp = await removeProveedorAction(id);

    if (resp.error) {
      toast.error(resp.message);
      setIsLoading(false);
    } else {
      await getProveedores(1000, true);
      setIsLoading(false);
      toast.success(resp.message);
    }
  };

  return (
    <PermisoClient permiso={PermisoAccion.PROVEEDOR_DELETE}>
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
