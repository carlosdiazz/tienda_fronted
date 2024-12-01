"use client";

import { AppRouter, PermisoAccion } from "@/config";
import { AdminCard } from "../admin";
import { PermisoClient } from "../common";
import { useRoleStore } from "./role.store";
import { useEffect } from "react";

export const RoleAminCard = () => {
  const roles = useRoleStore((state) => state.roles);
  const getRoles = useRoleStore((state) => state.getRoles);

  useEffect(() => {
    getRoles(1000, true);
  }, []);

  return (
    <PermisoClient permiso={PermisoAccion.ROLE_VIEW}>
      <AdminCard
        title="Roles"
        descripcion="Todos los roles"
        total={roles.length}
        href={AppRouter.adminRoles}
        permiso={PermisoAccion.ROLE_CREATE}
      />
    </PermisoClient>
  );
};
