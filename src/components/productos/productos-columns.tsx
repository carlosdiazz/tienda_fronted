"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";

//Propio
import {
  Badge,
  Button,
  ProductoInterface,
  ProveedorInterface,
  Switch,
  TableCell,
  useProductosStore,
} from "@/components";
import { AppRouter, PermisoAccion } from "@/config";

import { PermisoClient } from "../common";

import { SortedIcon } from "../common/data-table";
import { formatoMonedaRD } from "@/lib";
import { removeProductoAction } from "../../actions/productos/productos-action";

export const columnsProductos: ColumnDef<ProductoInterface>[] = [
  {
    accessorKey: "codigo",
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
      const codigo: number = row.getValue("codigo");
      return <Badge variant={"secondary"}>{codigo}</Badge>;
    },
  },

  {
    accessorKey: "proveedor",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Proveedor
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const proveedor: ProveedorInterface | undefined =
        row.getValue("proveedor");
      return <Badge variant={"secondary"}>{proveedor?.name ?? ""}</Badge>;
    },
  },

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
    accessorKey: "stock",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stock
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const stock: number = row.getValue("stock");
      return <Badge variant={"secondary"}>{stock}</Badge>;
    },
  },

  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Precio
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price: number = row.getValue("price");
      const new_price = formatoMonedaRD(price);

      return <Badge variant={"secondary"}>{new_price}</Badge>;
    },
  },

  {
    accessorKey: "price_de_compra",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Precio de Compra
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price: number = row.getValue("price_de_compra");
      const new_price = formatoMonedaRD(price);

      return <Badge variant={"secondary"}>{new_price}</Badge>;
    },
  },

  {
    accessorKey: "is_service",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Servicio
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const is_service: boolean = row.getValue("is_service");

      return (
        <Badge variant={is_service ? "success" : "default"}>
          {is_service ? "Si" : "No"}
        </Badge>
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
      const producto = row.original;
      return (
        <TableCell className="flex space-x-2">
          <ButtonDeleteProductos id={producto.id} />
          <PermisoClient permiso={PermisoAccion.PRODUCTOS_UPDATE}>
            <Link href={`${AppRouter.adminProductos}/${producto.id}`}>
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

export const ButtonDeleteProductos = ({ id }: { id: number }) => {
  const [isLoading, setIsLoading] = useState(false);

  const getProductos = useProductosStore((state) => state.getProductos);

  const onDelete = async () => {
    setIsLoading(true);
    const resp = await removeProductoAction(id);

    if (resp.error) {
      toast.error(resp.message);
      setIsLoading(false);
    } else {
      await getProductos(1000, true);
      setIsLoading(false);
      toast.success(resp.message);
    }
  };

  return (
    <PermisoClient permiso={PermisoAccion.PRODUCTOS_DELETE}>
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
