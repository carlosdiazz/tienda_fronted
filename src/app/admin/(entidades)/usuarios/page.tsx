"use client";
import {
  Button,
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
  useFavoritosStore,
  useUsuariosStore,
  UsuarioGrid,
  UsuarioInterface,
} from "@/components";
import { AppRouter, PermisoAccion } from "@/config";
import { UpdateIcon } from "@radix-ui/react-icons";
import { Star, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UsuariosPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [activo, setActivo] = useState(true);

  const usuarios: UsuarioInterface[] = useUsuariosStore(
    (state) => state.usuarios
  );
  const getUsuarios = useUsuariosStore((state) => state.getUsuarios);
  const loadingUsuarios = useUsuariosStore((state) => state.loading);

  const permiso = PermisoAccion.USER_VIEW;
  const toggleFavorites = useFavoritosStore((state) => state.toggleFavorites);
  const isFavorite = useFavoritosStore((state) => state.isFavorite(permiso));

  useEffect(() => {
    getUsuarios(1000, activo, );
  }, [activo]);

  const onSubmit = async () => {
    setIsLoading(true);
    await getUsuarios(10000, activo);
    setIsLoading(false);
    toast.success("Usuarios Actualizados");
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
            {isFavorite ? <TrashIcon /> : <Star />}
            </Button>
            <h1 className="text-lg font-semibold md:text-2xl mb-2">Usuarios</h1>
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
            <PermisoClient permiso={PermisoAccion.USER_CREATE}>
              <Link href={`${AppRouter.adminUsuarios}/0`}>
                <Button>+</Button>
              </Link>
            </PermisoClient>
            <Button onClick={onSubmit} disabled={isLoading}>
              <UpdateIcon/>
            </Button>
          </div>
        </div>

        {loadingUsuarios === true ? (
          <LoadingPage />
        ) : usuarios.length === 0 ? (
          <EmptyEntity
            title="No hay Usuarios creados"
            subTitle="Para crear un nuevo Usuario pulsa '+'"
          />
        ) : (
          <UsuarioGrid usuarios={usuarios} />
        )}
      </div>
    </div>
  );
}
