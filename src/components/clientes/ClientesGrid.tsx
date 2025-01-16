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
import { ClienteInterface } from "./clientes.interface";
import { useCLienteStore } from "./clientes.store";
import { removeClienteAction } from "@/actions";


interface Props {
  clientes: ClienteInterface[];
}
export const ClientesGrid = ({ clientes }: Props) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {clientes.map((cliente) => (
          <ClienteCard cliente={cliente} key={cliente.id} />
        ))}
      </div>
    </div>
  );
};

interface PropsCliente {
  cliente: ClienteInterface;
}

export const ClienteCard = ({ cliente }: PropsCliente) => {
  const [isLoading, setIsLoading] = useState(false);
  const getClientes = useCLienteStore((state) => state.getClientes);

  const onDelete = async () => {
    setIsLoading(true);
    const resp = await removeClienteAction(cliente.id);
    setIsLoading(false);
    if (resp.error) {
      toast.error(resp.message);
    } else {
      await getClientes(100, true);
      toast.success(resp.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid justify-between gap-2">
        <h3 className="text-lg font-semibold">{cliente.name}</h3>
        <p className="text-muted-foreground">{cliente.documento}</p>
        </CardTitle>
      </CardHeader>

      <CardContent>


        <div className="flex items-center space-x-2 mt-4">
          <Switch checked={cliente.activo} />
          <Label>Activo</Label>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-x-2">
        <PermisoClient permiso={PermisoAccion.CLIENTE_DELETE}>
          <Button variant="destructive" disabled={isLoading} onClick={onDelete}>
            Eliminar
          </Button>
        </PermisoClient>

        <PermisoClient permiso={PermisoAccion.CLIENTE_UPDATE}>
          <Link href={`${AppRouter.adminClientes}/${cliente.id}`}>
            <Button variant="default">Editar</Button>
          </Link>
        </PermisoClient>

        <PermisoClient permiso={PermisoAccion.CLIENTE_VIEW}>
          <Link href={`${AppRouter.adminClientes}/${cliente.id}`}>
            <Button variant="secondary">Ver</Button>
          </Link>
        </PermisoClient>
      </CardFooter>
    </Card>
  );
};
