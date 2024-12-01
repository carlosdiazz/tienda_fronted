"use client";

import { useSession } from "next-auth/react";

interface Props {
  children: React.ReactNode;
  permiso: string;
}

export const PermisoClient = ({ permiso, children }: Props) => {
  const { data } = useSession({ required: true });

  // Verifica si el usuario tiene el permiso requerido
  const tienePermiso = data?.user.permisos.includes(permiso);

  // Renderiza el contenido basado en la verificación del permiso
  return tienePermiso ? <div>{children}</div> : null;
};
