import { z } from "zod";

export interface ProductoInterface {
  activo: boolean;
  codigo: number;
  descripcion: string;
  id: number;
  name: string;
  price: number;
  stock: number;
  is_service: boolean;
  stock_minimo: number;
}

export interface ProductoFormInterface {
  activo: boolean;
  codigo: number;
  descripcion: string;
  id: number;
  name: string;
  price: number;
  stock: number;
  is_service: boolean;
  stock_minimo: number;
}

export const productoFormSchema = z.object({
  activo: z.boolean(),
  codigo: z.number(),
  descripcion: z.string().min(3),
  id: z.number(),
  name: z.string().min(3),
  price: z.number(),
  stock: z.number(),
  is_service: z.boolean(),
  stock_minimo: z.number(),
});

export type ProductoFormSchemaType = z.infer<typeof productoFormSchema>;

export const emptyProducto: ProductoInterface = {
  activo: true,
  codigo: 100,
  descripcion: "",
  id: 0,
  name: "",
  price: 0,
  stock: 0,
  is_service: false,
  stock_minimo: 0,
};

export const entityProductoGQL = `
  activo
  codigo
  descripcion
  id
  name
  price
  stock
  is_service
  stock_minimo
`;
