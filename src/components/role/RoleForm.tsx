"use client";
import { useEffect, useState } from "react";
import {
  roleFormSchema,
  RoleFromSchemaType,
  RoleInterface,
} from "./role.interface";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createOrUpdateRoleByIdAction } from "@/actions";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  Switch,
  Textarea,
} from "../ui";
import { usePermisoAccionStore } from "../permisoAccion";
import { useRouter } from "next/navigation";
import { AppRouter, PermisoAccion } from "@/config";
import { PermisoClient } from "../common";

interface Props {
  role: RoleInterface;
}

export const RoleForm = ({ role }: Props) => {
  const [loading, setLoading] = useState(false);
  //const getRoles = useRoleStore((state) => state.getRoles);

  const permisos = usePermisoAccionStore((state) => state.permisos);
  const getPermisosAccion = usePermisoAccionStore((state) => state.getPermisos);

  const router = useRouter();

  useEffect(() => {
    getPermisosAccion();
  }, []);

  const form = useForm<RoleFromSchemaType>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      name: role.name,
      descripcion: role.descripcion,
      activo: role.activo,
      id: role.id,
      permiso_accion: role.permiso_accion.map((item) => item.id),
    },
  });

  const { handleSubmit } = form;

  async function onSubmit(data: RoleFromSchemaType) {
    setLoading(true);
    const resp = await createOrUpdateRoleByIdAction(data);
    setLoading(false);
    if (resp.error) {
      toast.error(resp.message);
    } else {
      //await getRoles(100);
      toast.success(resp.message);
      router.replace(AppRouter.adminRoles);
    }
  }

  return (
    <div>
      <h1 className="py-10">
        {role.id === 0 ? "Crear Rol" : "Actualizar Rol"}
      </h1>

      <div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-2">
              {/*Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre" {...field} />
                    </FormControl>
                    <FormDescription>Nombre del Rol</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*Descripcion */}
              <FormField
                control={form.control}
                name="descripcion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripcion</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Descripcion" {...field} />
                    </FormControl>
                    <FormDescription>Descripcion del juego</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*Activo*/}
              <FormField
                control={form.control}
                name="activo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="inline-flex items-center space-x-4">
                        <FormLabel>Activo</FormLabel>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="permiso_accion"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Card>
                        <CardHeader>
                          <CardTitle>Permiso</CardTitle>
                        </CardHeader>

                        <CardContent>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {permisos.map((permission) => (
                              <div
                                key={permission.id}
                                className=" items-center space-x-2 mt-2"
                              >
                                <Checkbox
                                  id={`${permission.id}`}
                                  checked={field.value.includes(permission.id)}
                                  onCheckedChange={(isChecked) => {
                                    const newPermissions = isChecked
                                      ? [...field.value, permission.id]
                                      : field.value.filter(
                                          (id) => id !== permission.id
                                        );

                                    field.onChange(newPermissions);
                                  }}
                                />
                                <Label className="text-sm">
                                  {permission.action}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-5">

            {role.id === 0 ? (
              <PermisoClient permiso={PermisoAccion.ROLE_CREATE}>
                <Button type="submit" disabled={loading}>
                  Crear Rol
                </Button>
              </PermisoClient>
            ) : (
              <PermisoClient permiso={PermisoAccion.ROLE_UPDATE}>
              <Button type="submit" disabled={loading}>
                Actualizar Rol
              </Button>
            </PermisoClient>
            )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
