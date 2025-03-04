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
import { ChevronLeft, ChevronRight, Edit, Eye } from "lucide-react";

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

  const [isLoading, setIsLoading] = useState(false);
  const getFacturas = useFacturaStore((state) => state.getFactura);

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const onDelete = async (id: number) => {
    setIsLoading(true);
    const resp = await removeFacturaAction(id);
    setIsLoading(false);
    if (resp.error) {
      toast.error(resp.message);
    } else {
      await getFacturas(100, true, null);
      toast.success(resp.message);
    }
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
                <TableHead>Metodo de Pago</TableHead>
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
                  <TableCell>{factura.metodo_pago}</TableCell>
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
                  <TableCell className="flex space-x-2">
                    <Link href={`${AppRouter.adminFactura}/${factura.id}`}>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>

                    <PermisoClient permiso={PermisoAccion.FACTURA_DELETE}>
                      {factura.activo && (<Button
                        variant="destructive"
                        disabled={isLoading}
                        onClick={() => onDelete(factura.id)}
                      >
                        X
                      </Button>)}
                    </PermisoClient>
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
    </div>
  );
};
