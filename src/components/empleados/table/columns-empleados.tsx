import { Badge, Button, PermisoClient, Switch } from "@/components";
import { AppRouter, PermisoAccion } from "@/config";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { ColumnDef, SortDirection } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";
import Link from "next/link";

export type EmpleadosColumns = {
  id: number;
  codigo: number;
  name: string;
  descripcion: string;
  activo: boolean;
  sueldo: number;
  fecha: string;
};

const SortedIcon = ({ isSorted }: { isSorted: SortDirection | false }) => {
  if (isSorted === "asc") {
    return <ChevronUpIcon className="h-4 w-4" />;
  }
  if (isSorted === "desc") {
    return <ChevronDownIcon className="h-4 w-4" />;
  }

  return <ArrowUpDown className="ml-2 h-4 w-4" />;
};

export const columnsEmpleados: ColumnDef<EmpleadosColumns>[] = [
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
    accessorKey: "sueldo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sueldo
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const sueldo: number = row.getValue("sueldo");
      return <Badge variant={"secondary"}>${sueldo}.00 </Badge>;
    },
  },
  {
    accessorKey: "fecha",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha de Ingreso
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const fecha: string = row.getValue("fecha");
      return <Badge variant={"outline"}>{fecha.slice(0, 10)}</Badge>;
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
      return <div />;
    },
    cell: ({ row }) => {
      const id: number = row.getValue("id");

      return (
        <PermisoClient permiso={PermisoAccion.EMPRESA_UPDATE}>
          <Link href={`${AppRouter.adminEmpleados}/${id}`}>
            <Button variant="secondary">
              <Eye />
            </Button>
          </Link>
        </PermisoClient>
      );
    },
  },
];
