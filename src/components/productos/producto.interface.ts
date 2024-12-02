import { z } from "zod";

export interface ProductoInterface {
  activo: boolean;
  codigo: number;
  descripcion: string;
  id: number;
  img_url?: string;
  name: string;
  price: number;
  stock: number;
}

export interface ProductoFormInterface {
  activo: boolean;
  codigo: number;
  descripcion: string;
  id: number;
  img_url?: string;
  name: string;
  price: number;
  stock: number;
}

export const productoFormSchema = z.object({
  activo: z.boolean(),
  codigo: z.number(),
  descripcion: z.string().min(3),
  id: z.number(),
  img_url: z.string().optional(),
  name: z.string().min(3),
  price: z.number(),
  stock: z.number(),
});

export type ProductoFormSchemaType = z.infer<typeof productoFormSchema>;

export const emptyProducto: ProductoInterface = {
  activo: true,
  codigo: 100,
  descripcion: "",
  id: 0,
  name: "",
  img_url: "",
  price: 0,
  stock: 0,
};

export const entityProductoGQL = `
  activo
  codigo
  descripcion
  id
  img_url
  name
  price
  stock
`;
