"use client";
import { ColumnDef } from "@tanstack/react-table";

//Propio
import {
  Badge,
  Button,
  InventarioInterface,
  ProductoInterface,
  ProveedorInterface,
  TableCell,
  useInventarioStore,
} from "@/components";

import { SortedIcon } from "../common/data-table";
import { useState } from "react";
import { changeStatusInventario } from "@/actions";
import { toast } from "sonner";

export const columnsInevntario: ColumnDef<InventarioInterface>[] = [
  {
    accessorKey: "producto",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Producto
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const producto: ProductoInterface | null = row.getValue("producto");
      return (
        <Badge variant={"secondary"}>
          {producto ? producto.name : "Sin-Producto"}
        </Badge>
      );
    },
  },

  {
    accessorKey: "proovedor",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Proovedor
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const proovedor: ProveedorInterface | null = row.getValue("proovedor");
      return (
        <Badge variant={"secondary"}>
          {proovedor ? proovedor.name : "Sin-Proovedor"}
        </Badge>
      );
    },
  },

  {
    accessorKey: "concepto",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Concepto
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
  },
  {
    accessorKey: "cantidad",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cantidad
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },

    cell: ({ row }) => {
      const cantidad: number = row.getValue("cantidad");
      return <Badge variant={"secondary"}>{cantidad}</Badge>;
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
          Modalidad
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },

    cell: ({ row }) => {
      const is_credito: boolean = row.getValue("is_credito");
      return (
        <Badge variant={is_credito ? "destructive" : "default"}>
          {is_credito ? "Credito" : "Debito"}
        </Badge>
      );
    },
  },
  //
  {
    id: "actions",

    cell: ({ row }) => {
      const inventario = row.original;
      return (
        <TableCell className="flex space-x-2">
          <ButtonChangeStatus id={inventario.id} ver={inventario.is_credito} />
        </TableCell>
      );
    },
  },
];

export const ButtonChangeStatus = ({
  id,
  ver,
}: {
  id: number;
  ver: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const getInventarios = useInventarioStore((state)=>state.getInventarios);

  const onChange = async () => {
    setIsLoading(true);
    const resp = await changeStatusInventario(id);
    if (resp.error) {
      toast.error(resp.message);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.success(resp.message);
      await getInventarios(10000, true)
    }
  };
  if (!ver) {
    return <div></div>;
  }

  return (
    <Button
      variant="destructive"
      disabled={isLoading}
      onClick={onChange}
    >
      Pagar Total
    </Button>
  );
};
