"use client";

import { AppRouter, PermisoAccion } from "@/config";
import { PermisoClient } from "../common";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Label,
  Switch,
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
import { FacturaInterface } from "./factura.interface";
import { useFacturaStore } from "./factura.store";
import { removeFacturaAction } from "@/actions";
import { ChevronLeft, ChevronRight, Edit } from "lucide-react";

interface Props {
  facturas: FacturaInterface[];
}

const FACTURA_PER_PAGE = 10;

export const FacturaGrid = ({ facturas }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(facturas.length / FACTURA_PER_PAGE);
  const startIndex = (currentPage - 1) * FACTURA_PER_PAGE;
  const endIndex = startIndex + FACTURA_PER_PAGE;
  const currentFacturas = facturas.slice(startIndex, endIndex);

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
          <CardTitle>Lista de Facturas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Codigo</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Total Pagado</TableHead>
                <TableHead>Faltante</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentFacturas.map((factura) => (
                <TableRow key={factura.id}>
                  <TableCell>{factura.codigo_factura}</TableCell>
                  <TableCell>{factura.cliente.name}</TableCell>
                  <TableCell>{factura.total}</TableCell>
                  <TableCell>{factura.total_pagado}</TableCell>
                  <TableCell>{factura.faltante}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        factura.total === factura.total_pagado
                          ? "info"
                          : "destructive"
                      }
                    >
                      {factura.total === factura.total_pagado
                        ? "Pagada"
                        : "Pendiente"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link href={`${AppRouter.adminFactura}/${factura.id}`}>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
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

interface PropsFactura {
  factura: FacturaInterface;
}

export const FacturaCard = ({ factura }: PropsFactura) => {
  const [isLoading, setIsLoading] = useState(false);
  const getFactura = useFacturaStore((state) => state.getFactura);

  const onDelete = async () => {
    setIsLoading(true);
    const resp = await removeFacturaAction(factura.id);
    setIsLoading(false);
    if (resp.error) {
      toast.error(resp.message);
    } else {
      await getFactura(100, true);
      toast.success(resp.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid justify-between gap-2">
          <Badge variant={"secondary"}>#{factura.codigo_factura}</Badge>
          <Badge
            variant={
              factura.total === factura.total_pagado ? "info" : "destructive"
            }
          >
            {factura.total === factura.total_pagado ? "Pagada" : "Pendiente"}
          </Badge>
          <h3 className="text-lg font-semibold">Total: {factura.total}</h3>
          <p className="text-muted-foreground">
            Total Pagado: {factura.total_pagado}
          </p>
          <p className="text-muted-foreground">
            Total Items: {factura.factura_detalle.length}
          </p>
        </CardTitle>
      </CardHeader>

      <CardContent className="mt-2">
        <div className="flex items-center space-x-2">
          <Switch checked={factura.activo} />
          <Label>Activo</Label>
        </div>
        <p className="text-muted-foreground mt-2">
          Cliente: {factura.cliente.name}
        </p>
      </CardContent>

      <CardFooter className="flex justify-end gap-x-2">
        <PermisoClient permiso={PermisoAccion.FACTURA_DELETE}>
          <Button variant="destructive" disabled={isLoading} onClick={onDelete}>
            Eliminar
          </Button>
        </PermisoClient>

        <PermisoClient permiso={PermisoAccion.FACTURA_UPDATE}>
          <Link href={`${AppRouter.adminFactura}/${factura.id}`}>
            <Button variant="default">Editar</Button>
          </Link>
        </PermisoClient>

        <PermisoClient permiso={PermisoAccion.FACTURA_VIEW}>
          <Link href={`${AppRouter.adminFactura}/${factura.id}`}>
            <Button variant="secondary">Ver</Button>
          </Link>
        </PermisoClient>
      </CardFooter>
    </Card>
  );
};
