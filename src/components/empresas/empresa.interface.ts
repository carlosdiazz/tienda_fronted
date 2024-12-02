import { z } from "zod";

export interface EmpresaInterface {
  activo: boolean;
  codigo: number;
  descripcion: string;
  id: number;
  img_url?: string;
  name: string;
  rnc: string;
}

export interface EmpresaFormInterface {
  activo: boolean;
  codigo: number;
  descripcion: string;
  id: number;
  img_url?: string;
  name: string;
  rnc: string;
}

export const empresaFormSchema = z.object({
  activo: z.boolean(),
  codigo: z.number(),
  descripcion: z.string().min(3),
  id: z.number(),
  img_url: z.string().optional(),
  name: z.string().min(3),
  rnc: z.string().min(3),
});

export type EmpresaFormSchemaType = z.infer<typeof empresaFormSchema>;

export const emptyEmpresa: EmpresaInterface = {
  activo: true,
  codigo: 100,
  descripcion: "",
  id: 0,
  name: "",
  rnc: "",
  img_url: "",
};

export const entityEmpresaGQL = `
  activo
  codigo
  descripcion
  id
  img_url
  name
  rnc
`;
