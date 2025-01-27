"use client";

import {
  Button,
  EmptyEntity,
  LoadingPage,
  PermisoClient,
  ProveedorGrid,
  ProveedorInterface,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  useFavoritosStore,
  useProveedorStore,
} from "@/components";
import { AppRouter, PermisoAccion } from "@/config";
import { Star, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function ProductosPage() {
  const [activo, setActivo] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectChange = (value: string) => {
    if (value === "true") {
      setActivo(true);
    } else {
      setActivo(false);
    }
  };

  const proveedores: ProveedorInterface[] = useProveedorStore(
    (state) => state.proveedores
  );
  const getProveedores = useProveedorStore((state) => state.getProveedores);
  const loadingProveedor = useProveedorStore((state) => state.loading);

  const permiso = PermisoAccion.PROVEEDOR_VIEW;
  const toggleFavorites = useFavoritosStore((state) => state.toggleFavorites);
  const isFavorite = useFavoritosStore((state) => state.isFavorite(permiso));

  const onSubmit = async () => {
    setIsLoading(true);
    await getProveedores(10000, activo);
    setIsLoading(false);
    toast.success("Proveedores Actualizados");
  };

  useEffect(() => {
    getProveedores(1000, activo);
  }, [activo]);

  return (
    <div>
      <div className="w-full mx-auto py-2 px-2">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="flex gap-4">
            <Button onClick={() => toggleFavorites(permiso)}>
            {isFavorite ? <TrashIcon /> : <Star />}
            </Button>
            <h1 className="text-lg font-semibold md:text-2xl mb-2">
              Proveedores
            </h1>
          </div>

          <div className="flex justify-end m-2 gap-x-4 ">
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Activo" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Activo</SelectLabel>
                  <SelectItem value="true">Activo</SelectItem>
                  <SelectItem value="false">Inactivo</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end m-2 gap-x-4">
            <PermisoClient permiso={PermisoAccion.PROVEEDOR_CREATE}>
              <Link href={`${AppRouter.adminProveedores}/0`}>
                <Button>Nuevo</Button>
              </Link>
            </PermisoClient>

            <Button onClick={onSubmit} disabled={isLoading}>
              Actualizar
            </Button>
          </div>
        </div>

        {loadingProveedor === true ? (
          <LoadingPage />
        ) : proveedores.length === 0 ? (
          <EmptyEntity
            title="No hay Proveedores creado"
            subTitle="Para crear un nuevo Proveedor pulsa '+'"
          />
        ) : (
          <ProveedorGrid proveedores={proveedores} />
        )}
      </div>
    </div>
  );
}
