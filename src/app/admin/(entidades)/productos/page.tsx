"use client";

import {
  Button,

  EmptyEntity,
  LoadingPage,
  PermisoClient,
  ProductoInterface,
  ProductosGrid,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,

  useFavoritosStore,
  useProductosStore,
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

  const productos: ProductoInterface[] = useProductosStore(
    (state) => state.productos
  );
  const getProductos = useProductosStore((state) => state.getProductos);
  const loadingProducto = useProductosStore((state) => state.loading);

  const permiso = PermisoAccion.PRODUCTOS_VIEW;
  const toggleFavorites = useFavoritosStore((state) => state.toggleFavorites);
  const isFavorite = useFavoritosStore((state) => state.isFavorite(permiso));

  const onSubmit = async () => {
    setIsLoading(true);
    await getProductos(10000, activo);
    setIsLoading(false);
    toast.success("Productos Actualizadas");
  };

  useEffect(() => {
    getProductos(1000, activo);
  }, [activo]);

  return (
    <div>
      <div className="w-full mx-auto py-2 px-2">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="flex gap-4">
            <Button onClick={() => toggleFavorites(permiso)}>
            {isFavorite ? <TrashIcon /> : <Star />}
            </Button>
            <h1 className="text-lg font-semibold md:text-2xl mb-2">Productos</h1>
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
            <PermisoClient permiso={PermisoAccion.PRODUCTOS_CREATE}>
              <Link href={`${AppRouter.adminProductos}/0`}>
                <Button>Nuevo</Button>
              </Link>
            </PermisoClient>

            <Button onClick={onSubmit} disabled={isLoading}>
              Actualizar
            </Button>
          </div>
        </div>

        {loadingProducto === true ? (
          <LoadingPage />
        ) : productos.length === 0 ? (
          <EmptyEntity
            title="No hay Productos creado"
            subTitle="Para crear un nuevo producto pulsa '+'"
          />
        ) : (
          <ProductosGrid productos={productos} />
        )}
      </div>
    </div>
  );
}
