"use client";

import { AppRouter, PermisoAccion } from "@/config";
import { PermisoClient } from "../common";
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

import { useState } from "react";

import { toast } from "sonner";
import Link from "next/link";
import { ComprobanteInterface } from "./comprobante.interface";
import { useComprobanteStore } from "./comprobante.store";
import { removeComprobanteAction } from "@/actions";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  Comprobantes: ComprobanteInterface[];
}

const COMPROBANTE_PER_PAGE = 10;

export const ComprobanteGrid = ({ Comprobantes }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(Comprobantes.length / COMPROBANTE_PER_PAGE);
  const startIndex = (currentPage - 1) * COMPROBANTE_PER_PAGE;
  const endIndex = startIndex + COMPROBANTE_PER_PAGE;
  const currentComprobantes = Comprobantes.slice(startIndex, endIndex);

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
          <CardTitle>Ultimos Recibos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Codigo</TableHead>
                <TableHead>Concepto</TableHead>
                <TableHead>Monto Abonado</TableHead>
                <TableHead>Metodo de Pago</TableHead>
                <TableHead>Referencia de Pago</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentComprobantes.map((comprobante) => (
                <TableRow key={comprobante.id}>
                  <TableCell>{comprobante.id}</TableCell>
                  <TableCell>{comprobante.concepto}</TableCell>
                  <TableCell>${comprobante.monto_pagado}</TableCell>
                  <TableCell>{comprobante.metodo_pago}</TableCell>
                  <TableCell>{comprobante.referencia_pago}</TableCell>
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
          {Comprobante.map((index) => (
            <ComprobanteCard Comprobante={index} key={index.id} />
          ))}
        </div>
        */}
    </div>
  );
};

interface PropsComprobante {
  Comprobante: ComprobanteInterface;
}

export const ComprobanteCard = ({ Comprobante }: PropsComprobante) => {
  const [isLoading, setIsLoading] = useState(false);
  const getComprobante = useComprobanteStore((state) => state.getComprobante);

  const onDelete = async () => {
    setIsLoading(true);
    const resp = await removeComprobanteAction(Comprobante.id);
    setIsLoading(false);
    if (resp.error) {
      toast.error(resp.message);
    } else {
      await getComprobante(100, true);
      toast.success(resp.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid justify-between gap-2">
          <h3 className="text-lg font-semibold">
            Concepto: {Comprobante.concepto}
          </h3>
          <p className="text-muted-foreground">
            Monto Pagado: {Comprobante.monto_pagado}
          </p>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center space-x-2 mt-4">
          {/*Aqui colcoar la Factura a la que pertenece */}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-x-2">
        <PermisoClient permiso={PermisoAccion.COMPROBANTE_DELETE}>
          <Button variant="destructive" disabled={isLoading} onClick={onDelete}>
            Eliminar
          </Button>
        </PermisoClient>

        <PermisoClient permiso={PermisoAccion.COMPROBANTE_UPDATE}>
          <Link href={`${AppRouter.adminComprobante}/${Comprobante.id}`}>
            <Button variant="default">Editar</Button>
          </Link>
        </PermisoClient>

        <PermisoClient permiso={PermisoAccion.COMPROBANTE_VIEW}>
          <Link href={`${AppRouter.adminComprobante}/${Comprobante.id}`}>
            <Button variant="secondary">Ver</Button>
          </Link>
        </PermisoClient>
      </CardFooter>
    </Card>
  );
};
