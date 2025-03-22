import { z } from "zod";

export interface ComprobanteInterface {
  id: number;
  concepto: string;
  monto_pagado: number;
  referencia_pago: string;
  metodo_pago: string;
}

export interface ComprobanteFormInterface {
  id: number;
  concepto: string;
  monto_pagado: number;
  id_facura: number;
  referencia_pago: string;
  metodo_pago: string;
}

export const comprobanteFormSchema = z.object({
  id: z.number(),
  monto_pagado: z.number(),
  concepto: z.string().min(3),
  id_facura: z.number(),

  referencia_pago: z.string(),
  metodo_pago: z.string().min(3),
});

export type ComprobanteFormSchemaType = z.infer<typeof comprobanteFormSchema>;

export const emptyComprobante: ComprobanteInterface = {
  id: 0,
  concepto: "",
  monto_pagado: 0,
  metodo_pago: "",
  referencia_pago: "",
};

export const entityComprobanteGQL = `
  id
  monto_pagado
  concepto
  metodo_pago
  referencia_pago
`;
