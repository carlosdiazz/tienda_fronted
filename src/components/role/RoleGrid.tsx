"use client";

import Link from "next/link";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Label,
  Switch,
} from "../ui";
import { RoleInterface } from "./role.interface";
import { AppRouter, PermisoAccion } from "@/config";
import { PermisoClient } from "../common";
import { useState } from "react";
import { removeRoleAction } from "@/actions";
import { toast } from "sonner";
import { useRoleStore } from "./role.store";

interface Props {
  roles: RoleInterface[];
}

export const RoleGrid = ({ roles }: Props) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role) => (
          <CardRole role={role} key={role.id} />
        ))}
      </div>
    </div>
  );
};

interface PropsCardRole {
  role: RoleInterface;
}

export const CardRole = ({ role }: PropsCardRole) => {
  const [isLoading, setIsLoading] = useState(false);

  const getRoles = useRoleStore((state) => state.getRoles);

  const onDelete = async () => {
    setIsLoading(true);
    const resp = await removeRoleAction(role.id);
    setIsLoading(false);
    if (resp.error) {
      toast.error(resp.message);
    } else {
      await getRoles(100, true);
      toast.success(resp.message);
    }
  };

  return (
    <Card>
      <CardHeader>{role.name}</CardHeader>

      <CardContent>
        <p className="text-muted-foreground">{role.descripcion}</p>
        <div className="flex items-center space-x-2 mt-4">
          <Switch checked={role.activo} />
          <Label>Activo</Label>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-x-2">
        <PermisoClient permiso={PermisoAccion.ROLE_DELETE}>
          <Button variant="destructive" disabled={isLoading} onClick={onDelete}>
            Eliminar
          </Button>
        </PermisoClient>
        <PermisoClient permiso={PermisoAccion.ROLE_UPDATE}>
          <Link href={`${AppRouter.adminRoles}/${role.id}`}>
            <Button variant="default">Editar</Button>
          </Link>
        </PermisoClient>

        <PermisoClient permiso={PermisoAccion.ROLE_VIEW}>
          <Link href={`${AppRouter.adminRoles}/${role.id}`}>
            <Button variant="secondary">Ver</Button>
          </Link>
        </PermisoClient>
      </CardFooter>
    </Card>
  );
};
