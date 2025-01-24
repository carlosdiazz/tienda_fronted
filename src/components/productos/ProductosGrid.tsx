"use client";

import { AppRouter, PermisoAccion } from "@/config";
import { ImageCustom, PermisoClient } from "../common";
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
import { ProductoInterface } from "./producto.interface";
import { useProductosStore } from "./productos.store";
import { removeProductoAction } from "@/actions";

interface Props {
  productos: ProductoInterface[];
}
export const ProductosGrid = ({ productos }: Props) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {productos.map((producto) => (
          <ProductoCard producto={producto} key={producto.id} />
        ))}
      </div>
    </div>
  );
};

interface PropsProducto {
  producto: ProductoInterface;
}

export const ProductoCard = ({ producto }: PropsProducto) => {
  const [isLoading, setIsLoading] = useState(false);
  const getProductos = useProductosStore((state) => state.getProductos);

  const onDelete = async () => {
    setIsLoading(true);
    const resp = await removeProductoAction(producto.id);
    setIsLoading(false);
    if (resp.error) {
      toast.error(resp.message);
    } else {
      await getProductos(100, true);
      toast.success(resp.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between gap-4">
          <div className="flex items-center gap-3">
            <Badge className="h-8" variant={"info"}>
              #: {producto.codigo}
            </Badge>
            <Badge className="h-8" variant={"info"}>
              Stock: {producto.stock}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <h3 className="text-lg font-semibold">{producto.name}</h3>
        <p className="text-muted-foreground">{producto.descripcion}</p>

        <div className="flex items-center space-x-2 mt-4">
          <Switch checked={producto.activo} />
          <Label>Activo</Label>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-x-2">
        <PermisoClient permiso={PermisoAccion.PRODUCTOS_DELETE}>
          <Button variant="destructive" disabled={isLoading} onClick={onDelete}>
            Eliminar
          </Button>
        </PermisoClient>

        <PermisoClient permiso={PermisoAccion.PRODUCTOS_UPDATE}>
          <Link href={`${AppRouter.adminProductos}/${producto.id}`}>
            <Button variant="default">Editar</Button>
          </Link>
        </PermisoClient>

        <PermisoClient permiso={PermisoAccion.PRODUCTOS_VIEW}>
          <Link href={`${AppRouter.adminProductos}/${producto.id}`}>
            <Button variant="secondary">Ver</Button>
          </Link>
        </PermisoClient>
      </CardFooter>
    </Card>
  );
};
