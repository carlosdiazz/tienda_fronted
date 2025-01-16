import { z } from "zod";

export interface ProveedorInterface {
  id: number;
  name: string;
  descripcion: string;
  activo: boolean;
  direccion: string;
  telefono: string;
}

export interface ProveedorFormInterface {
  id: number;
  name: string;
  descripcion: string;
  activo: boolean;
  direccion: string;
  telefono: string;
}

export const proveedorFormSchema = z.object({
  id: z.number(),
  name: z.string().min(2),
  descripcion: z.string().min(3),
  activo: z.boolean(),
  direccion: z.string().min(2),
  telefono: z.string().min(2),
});

export type ProveedorFormSchemaType = z.infer<typeof proveedorFormSchema>;

export const emptyProveedor: ProveedorInterface = {
  id: 0,
  name: "",
  descripcion: "",
  activo: true,
  direccion: "",
  telefono: "",
};

export const entityProveedorGQL = `
  id
  name
  descripcion
  activo
  direccion
  telefono
`;
