"use client";

import {
  Button,
  EmptyEntity,
  FacturaGrid,
  FacturaInterface,
  LoadingPage,
  PermisoClient,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  useFacturaStore,
  useFavoritosStore,

} from "@/components";
import { AppRouter, PermisoAccion } from "@/config";
import { Star, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function FacturaPage() {
  const [activo, setActivo] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectChange = (value: string) => {
    if (value === "true") {
      setActivo(true);
    } else {
      setActivo(false);
    }
  };

  const factura: FacturaInterface[] = useFacturaStore(
    (state) => state.factura
  );
  const getFactura = useFacturaStore((state) => state.getFactura);
  const loadingFactura = useFacturaStore((state) => state.loading);

  const permiso = PermisoAccion.FACTURA_VIEW;
  const toggleFavorites = useFavoritosStore((state) => state.toggleFavorites);
  const isFavorite = useFavoritosStore((state) => state.isFavorite(permiso));

  const onSubmit = async () => {
    setIsLoading(true);
    await getFactura(10000, activo);
    setIsLoading(false);
    toast.success("Factura Actualizada");
  };

  useEffect(() => {
    getFactura(1000, activo);
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
              Factura
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
            <PermisoClient permiso={PermisoAccion.FACTURA_CREATE}>
              <Link href={`${AppRouter.adminFactura}/0`}>
                <Button>Nuevo</Button>
              </Link>
            </PermisoClient>

            <Button onClick={onSubmit} disabled={isLoading}>
              Actualizar
            </Button>
          </div>
        </div>

        {loadingFactura === true ? (
          <LoadingPage />
        ) : factura.length === 0 ? (
          <EmptyEntity
            title="No hay Factura creada"
            subTitle="Para crear un nuevoa Factura pulsa '+'"
          />
        ) : (
          <FacturaGrid facturas={factura} />
        )}
      </div>
    </div>
  );
}
