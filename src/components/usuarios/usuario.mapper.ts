import { validateProperty } from "@/lib";
import { UsuarioInterface } from "./usuario.interface";
import { GetRolesResponse } from "../role";
import { EmpresaMapper } from "../empleados";

export const UsuarioMapper = (data: any): UsuarioInterface => {
  return {
    id: validateProperty<number>(data, "id", "number"),
    nickname: validateProperty<string>(data, "nickname", "string"),
    email: validateProperty<string>(data, "email", "string"),
    activo: validateProperty<boolean>(data, "activo", "boolean"),
    empleado:
      data["empleado"] != null ? EmpresaMapper(data["empleado"]) : undefined,
    password: "",
    role: GetRolesResponse(data["role"]),
  };
};

export const GetUsuariosResponse = (data: any): UsuarioInterface[] => {
  const usuarios: UsuarioInterface[] = [];
  for (const key of data) {
    const usuarioFormart = UsuarioMapper(key);
    usuarios.push(usuarioFormart);
  }
  return usuarios;
};
