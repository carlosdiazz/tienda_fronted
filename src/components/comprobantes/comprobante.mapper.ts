import { validateProperty } from "@/lib";
import { ComprobanteInterface } from "./comprobante.interface";

export const ComprobanteMapper = (data: any): ComprobanteInterface => {
  return {
    id: validateProperty<number>(data, "id", "number"),
    monto_pagado: validateProperty<number>(data, "monto_pagado", "number"),
    concepto: validateProperty<string>(data, "concepto", "string"),
    metodo_pago: validateProperty<string>(data, "metodo_pago", "string"),
    referencia_pago: validateProperty<string>(
      data,
      "referencia_pago",
      "string"
    ),
  };
};

export const GetComprobanteResponse = (data: any): ComprobanteInterface[] => {
  const Comprobantes: ComprobanteInterface[] = [];
  for (const key of data) {
    const Comprobante = ComprobanteMapper(key);
    Comprobantes.push(Comprobante);
  }
  return Comprobantes;
};
