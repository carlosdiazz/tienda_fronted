"use client";
import Link from "next/link";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
} from "../ui";
import { PermisoClient } from "../common";
import { RoleAminCard } from "../role";

import { UsuarioAdminCard } from "../usuarios";
import { PermisoAccion } from "@/config";
import { useFavoritosStore } from "./admin-favorites.store";
import { EmpresaAdminCard } from "../empleados";
import { ProductosAdminCard, ProductosPocoStockAdminCard } from "../productos";
import { ProveedorAdminCard } from "../proveedores";
import { ClienteAdminCard } from "../clientes";
import { FacturaAdminCard } from "../facturas";
import { ComprobanteAdminCard } from "../comprobantes";
import { InventarioAdminCard, InventarioGrid } from "../inventario";

export const AdminGrid = () => {
  const isFavorite = useFavoritosStore((state) => state.isFavorite);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <ProductosPocoStockAdminCard/>

      {isFavorite(PermisoAccion.USER_VIEW) && <UsuarioAdminCard />}

      {isFavorite(PermisoAccion.ROLE_VIEW) && <RoleAminCard />}

      {isFavorite(PermisoAccion.EMPRESA_VIEW) && <EmpresaAdminCard />}

      {isFavorite(PermisoAccion.PRODUCTOS_VIEW) && <ProductosAdminCard />}

      {isFavorite(PermisoAccion.PRODUCTOS_VIEW) && <ProveedorAdminCard />}

      {isFavorite(PermisoAccion.CLIENTE_VIEW) && <ClienteAdminCard />}

      {isFavorite(PermisoAccion.FACTURA_VIEW) && <FacturaAdminCard />}

      {isFavorite(PermisoAccion.COMPROBANTE_VIEW) && <ComprobanteAdminCard />}

      {isFavorite(PermisoAccion.INVENTARIO_VIEW) && <InventarioAdminCard />}
    </div>
  );
};

interface PropsCard {
  title: string;
  descripcion: string;
  total: number;
  href: string;
  permiso: string;
}

export const AdminCard = ({
  title,
  descripcion,
  total,
  href,
  permiso,
}: PropsCard) => {
  return (
    <Card>
      <Link href={href}>
        <CardHeader>
          <div className=" flex gap-4">
            <CardTitle>{title}</CardTitle>
          </div>
          <CardDescription>{descripcion}</CardDescription>
        </CardHeader>
      </Link>

      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-4xl font-bold">
            {total == 0 ? (
              <Skeleton className="h-10 w-10" />
            ) : (
              <div>{total}</div>
            )}
          </div>
          <Link href={`${href}/0`}>
            <PermisoClient permiso={permiso}>
              <Button size="sm">+</Button>
            </PermisoClient>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
