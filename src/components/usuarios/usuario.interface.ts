import { z } from "zod";
import { RoleInterface } from "../role";

export interface UsuarioInterface {
  id: number;
  name: string;
  email: string;
  nickname: string;
  activo: boolean;
  password?: string;
  role: RoleInterface[];
}

export interface UsuarioFormInterface {
  id: number;
  name: string;
  email: string;
  nickname: string;
  activo: boolean;
  password?: string;
  roles: number[];
}

export const entityUsuarioGQL = `
  activo
  email
  id
  name
  nickname
`;

export const emptyUsuario: UsuarioInterface = {
  activo: true,
  email: "",
  id: 0,
  name: "",
  nickname: "",
  password: "",
  role: [],
};

export const usuarioFormSchema = z.object({
  id: z.number(),
  name: z.string().min(3),
  nickname: z.string().min(3),
  email: z.string().email(),
  activo: z.boolean(),
  password: z.string().min(8).optional(),
  roles: z.array(z.number()).min(1, "Debe seleccionar al menos 1 Rol"),
});

export type UsuarioFormSchemaType = z.infer<typeof usuarioFormSchema>;
