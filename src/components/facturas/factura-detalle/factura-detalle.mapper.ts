import { validateProperty } from "@/lib";
import { ProductoMapper } from "@/components";
import { FacturaDetalleInterface } from "./factura-detalle.interface";

export const FacturaDetalleMapper = (data: any): FacturaDetalleInterface => {
  return {
    cantidad: validateProperty<number>(data, "cantidad", "number"),
    precio: validateProperty<number>(data, "precio", "number"),
    total: validateProperty<number>(data, "total", "number"),
    producto: ProductoMapper(data["producto"]),
  };
};

export const GetFacturaDetalleResponse = (
  data: any
): FacturaDetalleInterface[] => {
  const facturaDetalles: FacturaDetalleInterface[] = [];
  for (const key of data) {
    const facturaDetalle = FacturaDetalleMapper(key);
    facturaDetalles.push(facturaDetalle);
  }
  return facturaDetalles;
};
