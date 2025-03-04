"use client";

import React from "react";

import { FacturaInterface } from "./factura.interface";
import {
  Badge,
  Button,
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
import { generatePDF } from "./generar-pdf";
import { Import } from "lucide-react";
import { FacturaDetalle } from "./FacturaDetalle";

interface Props {
  factura: FacturaInterface;
}

export const FacturaForm = ({ factura }: Props) => {
  const handlePrint = () => {
    generatePDF(factura);
  };

  return (
    <div className=" mx-auto ">
      <div className="flex gap-4">
        <h1 className="text-2xl font-bold mb-4">Detalles de la Factura</h1>
        <Button onClick={handlePrint}>
          {" "}
          <Import></Import>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {/*Detalle Factura */}
        <FacturaDetalle factura={factura}/>

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
                  <TableHead className="text-right">Metodo de Pago</TableHead>
                  <TableHead className="text-right">Referencia de Pago</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {factura.comprobante.map((comprobante, index) => (
                  <TableRow key={index}>
                    <TableCell>{comprobante.concepto}</TableCell>
                    <TableCell className="text-right">
                      ${comprobante.monto_pagado.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      {comprobante.metodo_pago}
                    </TableCell>
                    <TableCell className="text-right">
                      {comprobante.referencia_pago}
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
