"use client";

import { useEffect } from "react";

import { AppRouter, PermisoAccion } from "@/config";
import { PermisoClient } from "../common";

import { AdminCard } from "../admin";
import { useComprobanteStore } from "./comprobante.store";



export const ComprobanteAdminCard = () => {
  const Comprobante = useComprobanteStore((state) => state.Comprobante);
  const getComprobante = useComprobanteStore((state) => state.getComprobante);

  useEffect(() => {
    getComprobante(1000, true);
  }, []);

  return (
    <PermisoClient permiso={PermisoAccion.COMPROBANTE_VIEW}>
      <AdminCard
        title="Comprobante"
        descripcion="Comprobante Creados"
        total={Comprobante.length}
        href={AppRouter.adminComprobante}
        permiso={PermisoAccion.COMPROBANTE_CREATE}
      />
    </PermisoClient>
  );
};
