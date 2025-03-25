"use client";

import { formatoMonedaRD } from "@/lib";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "../ui";
import { FacturaInterface } from "./factura.interface";

interface Props {
  factura: FacturaInterface;
}

export const FacturaDetalle = ({ factura }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumen de la Factura</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <strong>Cliente:</strong> {factura.cliente.name}
          </p>
          <p>
            <strong>Código:</strong> {factura.codigo_factura}
          </p>

          <p>
            <strong>Metodo de Pago:</strong> {factura.metodo_pago}
          </p>

          <p>
            <strong>Referencia de Pago:</strong> {factura.referencia_pago}
          </p>
          <p>
            <strong>Total a Pagar:</strong> {formatoMonedaRD(factura.total)}
          </p>

          <p>
            <strong>Total Pagado:</strong>
            {formatoMonedaRD(factura.total_pagado)}
          </p>
          <p>
            <strong>Faltante:</strong> {formatoMonedaRD(factura.faltante)}
          </p>
          <p>
            <strong>Tipo:</strong>{" "}
            <Badge variant={factura.is_credito ? "secondary" : "default"}>
              {factura.is_credito ? "Crédito" : "Contado"}
            </Badge>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
