import { z } from "zod";

export interface EmpresaInterface {
  id: number;
  name: string;
  descripcion: string;
  activo: boolean;
  codigo: number;
  cedula: string;
}

export interface EmpresaFormInterface {
  id: number;
  name: string;
  descripcion: string;
  activo: boolean;
  codigo: number;
  cedula: string;
}

export const empresaFormSchema = z.object({
  id: z.number(),
  name: z.string().min(3),
  descripcion: z.string().min(3),
  activo: z.boolean(),
  codigo: z.number(),
  cedula: z.string().min(3),
});

export type EmpresaFormSchemaType = z.infer<typeof empresaFormSchema>;

export const emptyEmpresa: EmpresaInterface = {
  activo: true,
  codigo: 100,
  descripcion: "",
  id: 0,
  name: "",
  cedula: "",
};

export const entityEmpresaGQL = `
  id
  name
  descripcion
  activo
  codigo
  cedula
`;
