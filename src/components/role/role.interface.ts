import { z } from "zod";
import { PermisoAccionInterface } from "../permisoAccion";

export interface RoleInterface {
  activo: boolean;
  descripcion: string;
  name: string;
  id: number;
  permiso_accion: PermisoAccionInterface[];
}

export interface RoleFormInterface {
  activo: boolean;
  descripcion: string;
  name: string;
  id: number;
  permiso_accion: number[];
}

export const entityRoleGQL = `
  id
  activo
  descripcion
  name
  permiso_accion {
    action
    id
  }
`;

export const emptyRole: RoleInterface = {
  activo: true,
  descripcion: "",
  id: 0,
  name: "",
  permiso_accion: [],
};

export const roleFormSchema = z.object({
  id: z.number(),
  name: z.string().min(3),
  descripcion: z.string().min(3),
  activo: z.boolean(),
  permiso_accion: z
    .array(z.number())
    .min(2, "Debe seleccionar al menos 2 permisos"),
});

export type RoleFromSchemaType = z.infer<typeof roleFormSchema>;
