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
} from "../ui";

import { useState } from "react";

import { toast } from "sonner";
import Link from "next/link";
import { FacturaInterface } from "./factura.interface";
import { useFacturaStore } from "./factura.store";
import { removeFacturaAction } from "@/actions";



interface Props {
  factura: FacturaInterface[];
}
export const FacturaGrid = ({ factura }: Props) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {factura.map((index) => (
          <FacturaCard factura={index} key={index.id} />
        ))}
      </div>
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
        <Badge variant={factura.total === factura.total_pagado ? "info" : "destructive"}>{factura.total === factura.total_pagado ? "Pagada" : "Pendiente"}</Badge>
        <h3 className="text-lg font-semibold">Total: {factura.total}</h3>
          <p className="text-muted-foreground">Total Pagado: {factura.total_pagado}</p>
          <p className="text-muted-foreground">Total Items: {factura.factura_detalle.length}</p>
        </CardTitle>
      </CardHeader>

      <CardContent className="mt-2">
        <div className="flex items-center space-x-2">
          <Switch checked={factura.activo} />
          <Label>Activo</Label>
        </div>
        <p className="text-muted-foreground mt-2">Cliente: {factura.cliente.name}</p>
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
