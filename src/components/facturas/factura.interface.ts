import { z } from "zod";

export interface FacturaInterface {
  id: number;
  activo: boolean;
  total: number;
  codigo_factura: number;
  is_credito: boolean;
  total_pagado: number;
  faltante: number;
}

export interface FacturaFormInterface {
  id: number;
  activo: boolean;
  total: number;
  codigo_factura: number;
  is_credito: boolean;
  total_pagado: number;
  faltante: number;
}

export const facturaFormSchema = z.object({
  id: z.number(),
  activo: z.boolean(),
  total: z.number(),
  codigo_factura: z.number(),
  is_credito: z.boolean(),
  total_pagado: z.number(),
  faltante: z.number(),
});

export type FacturaFormSchemaType = z.infer<typeof facturaFormSchema>;

export const emptyFactura: FacturaInterface = {
  id: 0,
  activo: true,
  codigo_factura: 0,
  faltante: 0,
  is_credito: false,
  total: 0,
  total_pagado: 0,
};

export const entityFacturaGQL = `
  activo
  codigo_factura
  faltante
  id
  is_credito
  total
  total_pagado
`;
