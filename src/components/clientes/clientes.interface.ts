import { z } from "zod";

export interface ClienteInterface {
  id: number;
  name: string;
  activo: boolean;
  documento: string;
  tipo_documento: string;
  telefono: string;
}

export interface ClienteFormInterface {
  id: number;
  name: string;
  activo: boolean;
  documento: string;
  tipo_documento: string;
  telefono: string;
}

export const clienteFormSchema = z.object({
  id: z.number(),
  name: z.string().min(2),
  activo: z.boolean(),
  telefono: z.string().min(2),
  documento: z.string(),
  tipo_documento: z.string().min(2),
});

export type ClienteFormSchemaType = z.infer<typeof clienteFormSchema>;

export const emptyCliente: ClienteInterface = {
  id: 0,
  name: "",
  activo: true,
  telefono: "",
  documento: "",
  tipo_documento: "Cédula",
};

export const entityClienterGQL = `
  activo
  documento
  id
  name
  telefono
  tipo_documento
`;
