import { Button, PermisoClient, Switch } from "@/components";
import { AppRouter, PermisoAccion } from "@/config";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { ColumnDef, SortDirection } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";
import Link from "next/link";

export type UsuariosColumns = {
  id: number,
  name: string,
  email: string,
  nickname: string,
  activo:boolean
}

const SortedIcon = ({ isSorted }: { isSorted: SortDirection | false }) => {
  if (isSorted === "asc") {
    return <ChevronUpIcon className="h-4 w-4" />;
  }
  if (isSorted === "desc") {
    return <ChevronDownIcon className="h-4 w-4" />;
  }

  return <ArrowUpDown className="ml-2 h-4 w-4" />;
};

export const columnsUsuarios: ColumnDef<UsuariosColumns>[] = [
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
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
  },
  {
    accessorKey: "nickname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Apodo
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
        <PermisoClient permiso={PermisoAccion.USER_UPDATE}>
          <Link href={`${AppRouter.adminUsuarios}/${id}`}>
            <Button variant="secondary">
              <Eye />
            </Button>
          </Link>
        </PermisoClient>
      );
    },
  },
];
