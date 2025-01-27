"use client";

import {
  Button,
  ClienteInterface,
  ClientesGrid,
  EmptyEntity,
  LoadingPage,
  PermisoClient,

  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  useCLienteStore,
  useFavoritosStore,

} from "@/components";
import { AppRouter, PermisoAccion } from "@/config";
import { Star, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function ClientesPage() {
  const [activo, setActivo] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectChange = (value: string) => {
    if (value === "true") {
      setActivo(true);
    } else {
      setActivo(false);
    }
  };

  const clientes: ClienteInterface[] = useCLienteStore(
    (state) => state.clientes
  );
  const getClientes = useCLienteStore((state) => state.getClientes);
  const loadingClientes = useCLienteStore((state) => state.loading);

  const permiso = PermisoAccion.CLIENTE_VIEW;
  const toggleFavorites = useFavoritosStore((state) => state.toggleFavorites);
  const isFavorite = useFavoritosStore((state) => state.isFavorite(permiso));

  const onSubmit = async () => {
    setIsLoading(true);
    await getClientes(10000, activo);
    setIsLoading(false);
    toast.success("Clientes Actualizados");
  };

  useEffect(() => {
    getClientes(1000, activo);
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
              Clientes
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
            <PermisoClient permiso={PermisoAccion.CLIENTE_CREATE}>
              <Link href={`${AppRouter.adminClientes}/0`}>
                <Button>Nuevo</Button>
              </Link>
            </PermisoClient>

            <Button onClick={onSubmit} disabled={isLoading}>
              Actualizar
            </Button>
          </div>
        </div>

        {loadingClientes === true ? (
          <LoadingPage />
        ) : clientes.length === 0 ? (
          <EmptyEntity
            title="No hay Clientes creados"
            subTitle="Para crear un nuevo Cliente pulsa '+'"
          />
        ) : (
          <ClientesGrid clientes={clientes} />
        )}
      </div>
    </div>
  );
}
