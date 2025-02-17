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
import { ProveedorInterface } from "./proveedor.interface";
import { useProveedorStore } from "./proveedor.store";
import { removeProveedorAction } from "@/actions";
import { Eye } from "lucide-react";


interface Props {
  proveedores: ProveedorInterface[];
}
export const ProveedorGrid = ({ proveedores }: Props) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {proveedores.map((proveedor) => (
          <ProveedorCard proveedor={proveedor} key={proveedor.id} />
        ))}
      </div>
    </div>
  );
};

interface PropsProveedor {
  proveedor: ProveedorInterface;
}

export const ProveedorCard = ({ proveedor }: PropsProveedor) => {
  const [isLoading, setIsLoading] = useState(false);
  const getProveedores = useProveedorStore((state) => state.getProveedores);

  const onDelete = async () => {
    setIsLoading(true);
    const resp = await removeProveedorAction(proveedor.id);
    setIsLoading(false);
    if (resp.error) {
      toast.error(resp.message);
    } else {
      await getProveedores(100, true);
      toast.success(resp.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid justify-between gap-2">
        <h3 className="text-lg font-semibold">{proveedor.name}</h3>
        <p className="text-muted-foreground">{proveedor.descripcion}</p>
        </CardTitle>
      </CardHeader>

      <CardContent>


        <div className="flex items-center space-x-2 mt-4">
          <Switch checked={proveedor.activo} />
          <Label>Activo</Label>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-x-2">
        <PermisoClient permiso={PermisoAccion.PROVEEDOR_DELETE}>
          <Button variant="destructive" disabled={isLoading} onClick={onDelete}>
            X
          </Button>
        </PermisoClient>


        <PermisoClient permiso={PermisoAccion.PROVEEDOR_VIEW}>
          <Link href={`${AppRouter.adminProveedores}/${proveedor.id}`}>
            <Button variant="secondary"><Eye/></Button>
          </Link>
        </PermisoClient>
      </CardFooter>
    </Card>
  );
};
