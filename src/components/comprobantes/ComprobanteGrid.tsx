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
import { ComprobanteInterface } from "./comprobante.interface";
import { useComprobanteStore } from "./comprobante.store";
import { removeComprobanteAction } from "@/actions";



interface Props {
  Comprobante: ComprobanteInterface[];
}
export const ComprobanteGrid = ({ Comprobante }: Props) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Comprobante.map((index) => (
          <ComprobanteCard Comprobante={index} key={index.id} />
        ))}
      </div>
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
        <h3 className="text-lg font-semibold">Concepto: {Comprobante.concepto}</h3>
        <p className="text-muted-foreground">Monto Pagado: {Comprobante.monto_pagado}</p>
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
