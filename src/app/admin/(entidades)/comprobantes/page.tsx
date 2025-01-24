"use client";

import {
  Button,
  EmptyEntity,
  ComprobanteGrid,
  ComprobanteInterface,
  LoadingPage,
  PermisoClient,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  useComprobanteStore,
  useFavoritosStore,

} from "@/components";
import { AppRouter, PermisoAccion } from "@/config";
import { Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function ComprobantePage() {
  const [activo, setActivo] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectChange = (value: string) => {
    if (value === "true") {
      setActivo(true);
    } else {
      setActivo(false);
    }
  };

  const Comprobante: ComprobanteInterface[] = useComprobanteStore(
    (state) => state.Comprobante
  );
  const getComprobante = useComprobanteStore((state) => state.getComprobante);
  const loadingComprobante = useComprobanteStore((state) => state.loading);

  const permiso = PermisoAccion.COMPROBANTE_VIEW;
  const toggleFavorites = useFavoritosStore((state) => state.toggleFavorites);
  const isFavorite = useFavoritosStore((state) => state.isFavorite(permiso));

  const onSubmit = async () => {
    setIsLoading(true);
    await getComprobante(10000, activo);
    setIsLoading(false);
    toast.success("Comprobante Actualizada");
  };

  useEffect(() => {
    getComprobante(1000, activo);
  }, [activo]);

  return (
    <div>
      <div className="w-full mx-auto py-2 px-2">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="flex gap-4">
            <Button onClick={() => toggleFavorites(permiso)}>
              {isFavorite ? (
                <Star style={{ color: "red" }} />
              ) : (
                <Star style={{ color: "black" }} />
              )}
            </Button>
            <h1 className="text-lg font-semibold md:text-2xl mb-2">
              Comprobante
            </h1>
          </div>

          <div className="flex justify-end m-2 gap-x-4">
            <PermisoClient permiso={PermisoAccion.COMPROBANTE_CREATE}>
              <Link href={`${AppRouter.adminComprobante}/0`}>
                <Button>Nuevo</Button>
              </Link>
            </PermisoClient>

            <Button onClick={onSubmit} disabled={isLoading}>
              Actualizar
            </Button>
          </div>
        </div>

        {loadingComprobante === true ? (
          <LoadingPage />
        ) : Comprobante.length === 0 ? (
          <EmptyEntity
            title="No hay Comprobante creada"
            subTitle="Para crear un nuevoa Comprobante pulsa '+'"
          />
        ) : (
          <ComprobanteGrid Comprobantes={Comprobante} />
        )}
      </div>
    </div>
  );
}
