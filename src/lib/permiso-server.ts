import { auth } from "@/auth";

export const permisoServer = async (permiso: string): Promise<boolean> => {
  const session = await auth();
  const ver = session?.user.permisos.includes(permiso);

  return ver ?? false;
};
