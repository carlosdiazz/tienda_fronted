import { z } from "zod";
import { RoleInterface } from "../role";
import { EmpresaInterface } from "../empleados";

export interface UsuarioInterface {
  id: number;
  email: string;
  nickname: string;
  activo: boolean;
  password?: string;
  role: RoleInterface[];
  empleado?: EmpresaInterface;
}

export interface UsuarioFormInterface {
  id: number;
  email: string;
  nickname: string;
  activo: boolean;
  password?: string;
  roles: number[];
  id_empleado: number;
}

export const entityUsuarioGQL = `
  activo
  email
  id
  nickname
`;

export const emptyUsuario: UsuarioInterface = {
  activo: true,
  email: "",
  id: 0,
  nickname: "",
  password: "",
  role: [],
};

export const usuarioFormSchema = z.object({
  id: z.number(),
  nickname: z.string().min(3),
  email: z.string().email(),
  activo: z.boolean(),
  password: z.string().min(8).optional(),
  roles: z.array(z.number()).min(1, "Debe seleccionar al menos 1 Rol"),
  id_empleado: z.number(),
});

export type UsuarioFormSchemaType = z.infer<typeof usuarioFormSchema>;
