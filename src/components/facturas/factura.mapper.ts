import { validateProperty } from "@/lib";
import { FacturaInterface } from "./factura.interface";
import { GetFacturaDetalleResponse } from "./factura-detalle";
import { GetComprobanteResponse } from "../comprobantes";
import { ClienteMapper } from "../clientes";
import { UsuarioMapper } from "../usuarios";

export const FacturaMapper = (data: any): FacturaInterface => {
  return {
    id: validateProperty<number>(data, "id", "number"),
    activo: validateProperty<boolean>(data, "activo", "boolean"),
    codigo_factura: validateProperty<number>(data, "codigo_factura", "number"),
    faltante: validateProperty<number>(data, "faltante", "number"),
    total: validateProperty<number>(data, "total", "number"),
    total_pagado: validateProperty<number>(data, "total_pagado", "number"),
    is_credito: validateProperty<boolean>(data, "is_credito", "boolean"),
    factura_detalle: GetFacturaDetalleResponse(data["factura_detalle"]),
    comprobante: GetComprobanteResponse(data["comprobante"]),
    cliente: ClienteMapper(data["cliente"]),
    metodo_pago: validateProperty<string>(data, "metodo_pago", "string"),
    user: UsuarioMapper(data["user"]),
    referencia_pago: validateProperty<string>(
      data,
      "referencia_pago",
      "string"
    ),
  };
};

export const GetFacturaResponse = (data: any): FacturaInterface[] => {
  const facturas: FacturaInterface[] = [];
  for (const key of data) {
    const factura = FacturaMapper(key);
    facturas.push(factura);
  }
  return facturas;
};
