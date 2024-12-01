import { validateProperty } from "@/lib";
import { PermisoAccionInterface } from "./permisoAccion.interface";

export const PermisoAccionMaper = (data: any): PermisoAccionInterface => {
  return {
    action: validateProperty<string>(data, "action", "string"),
    id: validateProperty<number>(data, "id", "number"),
  };
};

export const GetPermisoAccionResponse = (
  data: any
): PermisoAccionInterface[] => {
  const permisos: PermisoAccionInterface[] = [];
  for (const key of data) {
    const permiso = PermisoAccionMaper(key);
    permisos.push(permiso);
  }
  return permisos;
};
