"use client";

import {
  Button,
  EmptyEntity,
  InventarioGrid,
  InventarioInterface,
  LoadingPage,
  PermisoClient,
  useFavoritosStore,
  useInventarioStore,
} from "@/components";
import { AppRouter, PermisoAccion } from "@/config";
import { Star, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function InventarioPage() {
  const [isLoading, setIsLoading] = useState(false);

  const inventarios: InventarioInterface[] = useInventarioStore(
    (state) => state.inventarios
  );
  const getInventario = useInventarioStore((state) => state.getInventarios);
  const loadingInevntario = useInventarioStore((state) => state.loading);

  //TODO cambiar permiso
  const permiso = PermisoAccion.INVENTARIO_VIEW;
  const toggleFavorites = useFavoritosStore((state) => state.toggleFavorites);
  const isFavorite = useFavoritosStore((state) => state.isFavorite(permiso));

  const onSubmit = async () => {
    setIsLoading(true);
    await getInventario(10000, true);
    setIsLoading(false);
    toast.success("Inevntarios Actualizados");
  };

  useEffect(() => {
    getInventario(1000, true);
  }, []);

  return (
    <div>
      <div className="w-full mx-auto py-2 px-2">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="flex gap-4">
            <Button onClick={() => toggleFavorites(permiso)}>
            {isFavorite ? <TrashIcon /> : <Star />}
            </Button>
            <h1 className="text-lg font-semibold md:text-2xl mb-2">
              Inventarios
            </h1>
          </div>

          <div className="flex justify-end m-2 gap-x-4">
            <PermisoClient permiso={PermisoAccion.INVENTARIO_CREATE}>
              <Link href={`${AppRouter.adminInventario}/0`}>
                <Button>Nuevo</Button>
              </Link>
            </PermisoClient>

            <Button onClick={onSubmit} disabled={isLoading}>
              Actualizar
            </Button>
          </div>
        </div>

        {loadingInevntario === true ? (
          <LoadingPage />
        ) : inventarios.length === 0 ? (
          <EmptyEntity
            title="No hay Inventarios creados"
            subTitle="Para crear un nuevo pulse '+'"
          />
        ) : (
          <InventarioGrid inventarios={inventarios} />
        )}
      </div>
    </div>
  );
}
