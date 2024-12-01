"use client";

import { AppRouter, PermisoAccion } from "@/config";
import { AdminCard } from "../admin";
import { PermisoClient } from "../common";
import { useUsuariosStore } from "./usuario.store";
import { useEffect } from "react";

export const UsuarioAdminCard = () => {
  const usuarios = useUsuariosStore((state) => state.usuarios);
  const getUsuarios = useUsuariosStore((state) => state.getUsuarios);

  useEffect(() => {
    getUsuarios(1000, true);
  }, []);

  return (
    <PermisoClient permiso={PermisoAccion.USER_VIEW}>
      <AdminCard
        title="Usuarios"
        descripcion="Todos los usuarios"
        total={usuarios.length}
        href={AppRouter.adminUsuarios}
        permiso={PermisoAccion.USER_CREATE}
      />
    </PermisoClient>
  );
};
