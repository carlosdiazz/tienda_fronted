"use client";
import React, { useState } from "react";
import { InventarioInterface } from "./inventario.interface";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  inventarios: InventarioInterface[];
}

const INVENTARIO_PER_PAGE = 10;

export const InventarioGrid = ({ inventarios }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(inventarios.length / INVENTARIO_PER_PAGE);
  const startIndex = (currentPage - 1) * INVENTARIO_PER_PAGE;
  const endIndex = startIndex + INVENTARIO_PER_PAGE;
  const currentInventarios = inventarios.slice(startIndex, endIndex);

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  return (
    <div className="container">
      <Card>
        <CardHeader>
          <CardTitle>Historial de Inventarios</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre del Producto</TableHead>
                <TableHead>Concepto</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Proveedor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentInventarios.map((inventario) => (
                <TableRow key={inventario.id}>
                  <TableCell>
                    {inventario.producto?.name ?? "NO_NAME"}
                  </TableCell>
                  <TableCell>{inventario.concepto}</TableCell>
                  <TableCell>{inventario.cantidad}</TableCell>
                  <TableCell>{inventario.proovedor?.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>
          <div className="text-sm text-muted-foreground">
            Página {currentPage} de {totalPages}
          </div>
          <Button
            variant="outline"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Siguiente
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
      {/*
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {factura.map((index) => (
            <FacturaCard factura={index} key={index.id} />
          ))}
        </div>
        */}
    </div>
  );
};
