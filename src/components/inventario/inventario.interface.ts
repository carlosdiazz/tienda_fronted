import { z } from "zod";
import { ProductoInterface } from "../productos";

export interface InventarioInterface {
  id: number;
  cantidad: number;
  concepto: string;
  is_ingreso: boolean;
  is_credito: boolean;
  total_a_pagar: number;
  producto?: ProductoInterface;
}

export interface InventarioFormInterface {
  id: number;
  cantidad: number;
  concepto: string;
  is_ingreso: boolean;
  id_producto: number;
  is_credito: boolean;
}

export const inventarioFormSchema = z.object({
  id: z.number(),
  concepto: z.string().min(3),
  is_ingreso: z.boolean(),
  is_credito: z.boolean(),
  cantidad: z.number(),
  id_producto: z.number(),
});

export type InventarioFormSchemaType = z.infer<typeof inventarioFormSchema>;

export const emptyInventario: InventarioInterface = {
  id: 0,
  cantidad: 0,
  concepto: "",
  is_ingreso: true,
  is_credito: false,
  total_a_pagar: 0,
};

export const entityInventarioGQL = `
  cantidad
  concepto
  id
  is_ingreso
  is_credito
  total_a_pagar
`;
