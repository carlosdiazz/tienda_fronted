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
  id_facura: number;
}

export const comprobanteFormSchema = z.object({
  id: z.number(),
  monto_pagado: z.number(),
  concepto: z.string().min(3),
  id_facura: z.number(),
});

export type ComprobanteFormSchemaType = z.infer<typeof comprobanteFormSchema>;

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
