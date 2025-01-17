"use client";

import React from "react";

import { FacturaInterface } from "./factura.interface";
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui";

interface Props {
  factura: FacturaInterface;
}

export const FacturaForm = ({ factura }: Props) => {
  return (
    <div className=" mx-auto ">
      <h1 className="text-2xl font-bold mb-4">Detalles de la Factura</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {/*Detalle Factura */}
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
                <strong>Total:</strong> ${factura.total.toFixed(2)}
              </p>
              <p>
                <strong>Total Pagado:</strong> $
                {factura.total_pagado.toFixed(2)}
              </p>
              <p>
                <strong>Faltante:</strong> ${factura.faltante.toFixed(2)}
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

        {/*Desglose de Factura */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead className="text-right">Cantidad</TableHead>
                  <TableHead className="text-right">Precio</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {factura.factura_detalle.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.producto.name}</TableCell>
                    <TableCell className="text-right">
                      {product.cantidad}
                    </TableCell>
                    <TableCell className="text-right">
                      ${product.precio.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      ${product.total.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/*Comprobante Factura */}
        <Card>
          <CardHeader>
            <CardTitle>Comprobantes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Concepto</TableHead>
                  <TableHead className="text-right">Monto Pagado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {factura.comprobante.map((comprobante, index) => (
                  <TableRow key={index}>
                    <TableCell>{comprobante.concepto}</TableCell>
                    <TableCell className="text-right">
                      ${comprobante.monto_pagado.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
