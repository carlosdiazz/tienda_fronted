import { validateProperty } from "@/lib";
import { RoleInterface } from "./role.interface";
import { GetPermisoAccionResponse } from "../permisoAccion";

export const RoleMapper = (data: any): RoleInterface => {
  return {
    activo: validateProperty<boolean>(data, "activo", "boolean"),
    descripcion: validateProperty<string>(data, "descripcion", "string"),
    id: validateProperty<number>(data, "id", "number"),
    name: validateProperty<string>(data, "name", "string"),
    permiso_accion: GetPermisoAccionResponse(data["permiso_accion"]),
  };
};

export const GetRolesResponse = (data: any): RoleInterface[] => {
  const roles: RoleInterface[] = [];
  for (const key of data) {
    const roleFormat = RoleMapper(key);
    roles.push(roleFormat);
  }
  return roles;
};
