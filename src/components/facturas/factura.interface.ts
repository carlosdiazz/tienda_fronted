import { z } from "zod";
import {
  entityFacturaDetalleGQL,
  FacturaDetalleInterface,
} from "./factura-detalle";
import { entityProductoGQL } from "../productos";
import { ComprobanteInterface, entityComprobanteGQL } from "../comprobantes";
import { ClienteInterface, emptyCliente, entityClienterGQL } from "../clientes";

export interface FacturaInterface {
  id: number;
  activo: boolean;
  total: number;
  codigo_factura: number;
  is_credito: boolean;
  total_pagado: number;
  faltante: number;
  referencia_pago: string;
  metodo_pago: string;
  cliente: ClienteInterface;
  factura_detalle: FacturaDetalleInterface[];
  comprobante: ComprobanteInterface[];
}

export interface ProductosVentasInterface {
  cantidad: number;
  id_producto: number;
}

export const productosVentasSchema = z.object({
  id_producto: z.number(),
  cantidad: z.number(),
});

export interface FacturaFormInterface {
  id: number;
  activo: boolean;
  total: number;
  //codigo_factura: number;
  is_credito: boolean;
  total_pagado: number;
  faltante: number;
  id_cliente: number;
  referencia_pago: string;
  metodo_pago: string;
  productos: ProductosVentasInterface[];
}

export const facturaFormSchema = z.object({
  id: z.number(),
  activo: z.boolean(),
  total: z.number(),
  //codigo_factura: z.number(),
  is_credito: z.boolean(),
  total_pagado: z.number(),
  faltante: z.number(),
  id_cliente: z.number(),
  referencia_pago: z.string(),
  metodo_pago: z.string(),
  productos: z.array(productosVentasSchema),
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
  metodo_pago: "",
  referencia_pago: "",
  cliente: emptyCliente,
  factura_detalle: [],
  comprobante: [],
};

export const emptyFacturaFormVentas: FacturaFormInterface = {
  id: 0,
  activo: true,
  //codigo_factura: 0,
  faltante: 0,
  is_credito: false,
  total: 0,
  total_pagado: 0,
  id_cliente: 0,
  metodo_pago: "",
  referencia_pago: "",
  productos: [],
};

export const entityRelacionesFacturaGQL = `
  activo
  codigo_factura
  faltante
  id
  is_credito
  total
  total_pagado
  metodo_pago
  referencia_pago
  cliente {
    ${entityClienterGQL}
  }
  factura_detalle {
    ${entityFacturaDetalleGQL}
    producto{
      ${entityProductoGQL}
    }
  }
  comprobante {
    ${entityComprobanteGQL}
  }
`;

export const entityFacturaGQL = `
  activo
  codigo_factura
  faltante
  id
  is_credito
  total
  total_pagado
  metodo_pago
  referencia_pago
`;
