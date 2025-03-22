"use client";

import {
  Button,
  EmptyEntity,
  InventarioGrid,
  InventarioInterface,
  LoadingPage,
  PermisoClient,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  useFavoritosStore,
  useInventarioStore,
} from "@/components";
import { AppRouter, PermisoAccion } from "@/config";
import { UpdateIcon } from "@radix-ui/react-icons";
import { Star, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function InventarioPage() {
  const [isLoading, setIsLoading] = useState(false);

  const [is_credito, set_is_credito] = useState<boolean | undefined>(undefined);

  const inventarios: InventarioInterface[] = useInventarioStore(
    (state) => state.inventarios
  );
  const getInventario = useInventarioStore((state) => state.getInventarios);
  const loadingInevntario = useInventarioStore((state) => state.loading);

  const permiso = PermisoAccion.INVENTARIO_VIEW;
  const toggleFavorites = useFavoritosStore((state) => state.toggleFavorites);
  const isFavorite = useFavoritosStore((state) => state.isFavorite(permiso));


  const handleSelectCredito = (value: string) => {
    const is_credito =
      value === "true" ? true : value === "null" ? undefined : false;
    set_is_credito(is_credito);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    await getInventario(10000, true, is_credito,);
    setIsLoading(false);
    toast.success("Inevntarios Actualizados");
  };

  useEffect(() => {
    getInventario(1000, true, is_credito, );
  }, [is_credito,]);

  return (
    <div>
      <div className="w-full mx-auto py-2 px-2">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex gap-4">
            <Button onClick={() => toggleFavorites(permiso)}>
              {isFavorite ? <TrashIcon /> : <Star />}
            </Button>
            <h1 className="text-lg font-semibold md:text-2xl mb-2">Almacen</h1>
          </div>

          <div className="flex justify-end m-2 gap-x-4">
            <Select
              onValueChange={handleSelectCredito}
              value={is_credito?.toString()}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Estatus" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Estatus</SelectLabel>
                  <SelectItem value="null">Todos</SelectItem>
                  <SelectItem value="true">Credito</SelectItem>
                  <SelectItem value="false">Debito</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>


            <PermisoClient permiso={PermisoAccion.INVENTARIO_CREATE}>
              <Link href={`${AppRouter.adminInventario}/0`}>
                <Button>Registrar Nueva Mercancia (+)</Button>
              </Link>
            </PermisoClient>

            <Button onClick={onSubmit} disabled={isLoading}>
              <UpdateIcon />
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
