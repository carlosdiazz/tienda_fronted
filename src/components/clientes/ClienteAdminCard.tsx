"use client";

import { useEffect } from "react";

import { AppRouter, PermisoAccion } from "@/config";
import { PermisoClient } from "../common";

import { AdminCard } from "../admin";
import { useCLienteStore } from "./clientes.store";


export const ClienteAdminCard = () => {
  const clientes = useCLienteStore((state) => state.clientes);
  const getClientes = useCLienteStore((state) => state.getClientes);

  useEffect(() => {
    getClientes(1000, true);
  }, []);

  return (
    <PermisoClient permiso={PermisoAccion.CLIENTE_VIEW}>
      <AdminCard
        title="Clientes"
        descripcion="Clientes Creados"
        total={clientes.length}
        href={AppRouter.adminClientes}
        permiso={PermisoAccion.CLIENTE_CREATE}
      />
    </PermisoClient>
  );
};
