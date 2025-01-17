import { ProductoInterface } from "@/components";

export interface FacturaDetalleInterface {
  producto: ProductoInterface;
  cantidad: number;
  precio: number;
  total: number;
}

export const entityFacturaDetalleGQL = `
  cantidad
  precio
  total
`;
