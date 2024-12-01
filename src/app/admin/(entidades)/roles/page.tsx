"use client";
import {
  Button,
  EmptyEntity,
  LoadingPage,
  PermisoClient,
  RoleGrid,
  RoleInterface,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  useFavoritosStore,
  useRoleStore,
} from "@/components";
import { AppRouter, PermisoAccion } from "@/config";
import { Star } from "lucide-react";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function RolesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [activo, setActivo] = useState(true);

  const roles: RoleInterface[] = useRoleStore((state) => state.roles);
  const getRoles = useRoleStore((state) => state.getRoles);
  const loadingRoles = useRoleStore((state) => state.loading);

  const permiso = PermisoAccion.ROLE_VIEW;
  const toggleFavorites = useFavoritosStore((state) => state.toggleFavorites);
  const isFavorite = useFavoritosStore((state) => state.isFavorite(permiso));

  useEffect(() => {
    getRoles(1000, activo);
  }, [activo]);

  const onSubmit = async () => {
    setIsLoading(true);
    await getRoles(10000, activo);
    setIsLoading(false);
    toast.success("Roles Actualizada");
  };

  const handleSelectChange = (value: string) => {
    if (value === "true") {
      setActivo(true);
    } else {
      setActivo(false);
    }
  };

  return (
    <div>
      <div className="w-full mx-auto py-2 px-2">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex gap-4">
            <Button onClick={() => toggleFavorites(permiso)}>
              {isFavorite ? (
                <Star style={{ color: "red" }} />
              ) : (
                <Star style={{ color: "black" }} />
              )}
            </Button>
            <h1 className="text-lg font-semibold md:text-2xl mb-2">Roles</h1>
          </div>

          <div className="flex justify-end m-2 gap-x-4">
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

            <PermisoClient permiso={PermisoAccion.ROLE_CREATE}>
              <Link href={`${AppRouter.adminRoles}/0`}>
                <Button>Nuevo</Button>
              </Link>
            </PermisoClient>
            <Button onClick={onSubmit} disabled={isLoading}>
              Actualizar
            </Button>
          </div>
        </div>

        {loadingRoles === true ? (
          <LoadingPage />
        ) : roles.length === 0 ? (
          <EmptyEntity
            title="No hay Roles creados"
            subTitle="Para crear un nuevo Rol pulsa '+'"
          />
        ) : (
          <RoleGrid roles={roles} />
        )}
      </div>
    </div>
  );
}
