"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";

//Propio
import { Button, RoleInterface, Switch, TableCell } from "@/components";
import { AppRouter, PermisoAccion } from "@/config";

import { PermisoClient } from "../common";
import { useRoleStore } from "./role.store";
import { removeRoleAction } from "@/actions";
import { SortedIcon } from "../common/data-table";

export const columnsRoles: ColumnDef<RoleInterface>[] = [
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
      const role = row.original;
      return (
        <TableCell className="flex space-x-2">
          <ButtonDeleteRole id={role.id} />
          <PermisoClient permiso={PermisoAccion.ROLE_UPDATE}>
            <Link href={`${AppRouter.adminRoles}/${role.id}`}>
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

export const ButtonDeleteRole = ({ id }: { id: number }) => {
  const [isLoading, setIsLoading] = useState(false);

  const getRoles = useRoleStore((state) => state.getRoles);

  const onDelete = async () => {
    setIsLoading(true);
    const resp = await removeRoleAction(id);

    if (resp.error) {
      toast.error(resp.message);
      setIsLoading(false);
    } else {
      await getRoles(1000, true);
      setIsLoading(false);
      toast.success(resp.message);
    }
  };

  return (
    <PermisoClient permiso={PermisoAccion.ROLE_DELETE}>
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
