import { z } from "zod";

export interface ComprobanteInterface {
  id: number;
  concepto: string;
  monto_pagado: number;
}

export interface ComprobanteFormInterface {
  id: number;
  concepto: string;
  monto_pagado: number;
}

export const ComprobanteFormSchema = z.object({
  id: z.number(),
  monto_pagado: z.number(),
  concepto: z.string().min(3),
});

export type ComprobanteFormSchemaType = z.infer<typeof ComprobanteFormSchema>;

export const emptyComprobante: ComprobanteInterface = {
  id: 0,
  concepto: "",
  monto_pagado: 0,
};

export const entityComprobanteGQL = `
  id
  monto_pagado
  concepto
`;
