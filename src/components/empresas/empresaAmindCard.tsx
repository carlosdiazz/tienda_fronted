"use client";

import { useEffect } from "react";
import { useEmpresaStore } from "./empresa.store";
import { AdminCard } from "../admin";
import { AppRouter, PermisoAccion } from "@/config";
import { PermisoClient } from "../common";

export const EmpresaAdminCard = () => {
  const empresas = useEmpresaStore((state) => state.empresas);
  const getEmpresas = useEmpresaStore((state) => state.getEmpresas);

  useEffect(() => {
    getEmpresas(1000, true);
  }, []);

  return (
    <PermisoClient permiso={PermisoAccion.EMPRESA_VIEW}>
      <AdminCard
        title="Empresas"
        descripcion="Empresas Creadas"
        total={empresas.length}
        href={AppRouter.adminEmpresas}
        permiso={PermisoAccion.EMPRESA_CREATE}
      />
    </PermisoClient>
  );
};
