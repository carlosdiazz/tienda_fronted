"use client";

import {
  Button,
  EmpresaGrid,
  EmpresaInterface,
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
  useEmpresaStore,
  useFavoritosStore,
} from "@/components";
import { AppRouter, PermisoAccion } from "@/config";
import { Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EmpresaPage() {
  const [activo, setActivo] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectChange = (value: string) => {
    if (value === "true") {
      setActivo(true);
    } else {
      setActivo(false);
    }
  };

  const empresas: EmpresaInterface[] = useEmpresaStore(
    (state) => state.empresas
  );
  const getEmpresa = useEmpresaStore((state) => state.getEmpresas);
  const loadingEmpresa = useEmpresaStore((state) => state.loading);

  const permiso = PermisoAccion.EMPRESA_VIEW;
  const toggleFavorites = useFavoritosStore((state) => state.toggleFavorites);
  const isFavorite = useFavoritosStore((state) => state.isFavorite(permiso));

  const onSubmit = async () => {
    setIsLoading(true);
    await getEmpresa(10000, activo);
    setIsLoading(false);
    toast.success("Empleados Actualizados");
  };

  useEffect(() => {
    getEmpresa(1000, activo);
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
            <h1 className="text-lg font-semibold md:text-2xl mb-2">Empleados</h1>
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
            <PermisoClient permiso={PermisoAccion.EMPRESA_CREATE}>
              <Link href={`${AppRouter.adminEmpleados}/0`}>
                <Button>Nuevo</Button>
              </Link>
            </PermisoClient>

            <Button onClick={onSubmit} disabled={isLoading}>
              Actualizar
            </Button>
          </div>
        </div>

        {loadingEmpresa === true ? (
          <LoadingPage />
        ) : empresas.length === 0 ? (
          <EmptyEntity
            title="No hay Empleados creada"
            subTitle="Para crear una nuevo Empleado pulsa '+'"
          />
        ) : (
          <EmpresaGrid empresas={empresas} />
        )}
      </div>
    </div>
  );
}
