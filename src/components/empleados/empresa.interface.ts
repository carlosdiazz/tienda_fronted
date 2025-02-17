import { z } from "zod";

export interface EmpresaInterface {
  id: number;
  name: string;
  descripcion: string;
  activo: boolean;
  codigo: number;
  cedula: string;
  sueldo: number;
  fecha: string;
}

export interface EmpresaFormInterface {
  id: number;
  name: string;
  descripcion: string;
  activo: boolean;
  codigo: number;
  cedula: string;
  sueldo: number;
  fecha: string;
}

export const empresaFormSchema = z.object({
  id: z.number(),
  name: z.string().min(3),
  descripcion: z.string().min(3),
  activo: z.boolean(),
  codigo: z.number(),
  cedula: z.string().min(3),
  fecha: z.string().min(10).max(11),
  sueldo:z.number()
});

export type EmpresaFormSchemaType = z.infer<typeof empresaFormSchema>;

export const emptyEmpresa: EmpresaInterface = {
  activo: true,
  codigo: 100,
  descripcion: "",
  id: 0,
  name: "",
  cedula: "",
  fecha: "",
  sueldo:0
};

export const entityEmpresaGQL = `
  id
  name
  descripcion
  activo
  codigo
  cedula
  sueldo
  fecha
`;
