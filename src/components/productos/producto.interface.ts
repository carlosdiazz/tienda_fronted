import { z } from "zod";
import { ProveedorInterface } from "../proveedores";

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
  price_de_compra: number;
  proveedor?: ProveedorInterface;
}

export interface ProductoFormInterface {
  activo: boolean;
  codigo: number;
  descripcion: string;
  id: number;
  name: string;
  price: number;
  stock: number;
  price_de_compra: number;
  is_service: boolean;
  stock_minimo: number;
  id_proveedor: number;
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
  id_proveedor: z.number(),
  price_de_compra: z.number(),
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
  price_de_compra: 0,
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
  price_de_compra
`;
