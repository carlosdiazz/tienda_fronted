"use client";
import { useEffect, useState } from "react";
import {
  usuarioFormSchema,
  UsuarioFormSchemaType,
  UsuarioInterface,
} from "./usuario.interface";
import { useUsuariosStore } from "./usuario.store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createOrUpdateUsuarioByIdAction } from "@/actions";
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
} from "../ui";
import { useRouter } from "next/navigation";
import { AppRouter, PermisoAccion } from "@/config";
import { useRoleStore } from "../role";
import { PermisoClient } from "../common";

interface Props {
  usuario: UsuarioInterface;
}

export const UsuarioForm = ({ usuario }: Props) => {
  const [loading, setLoading] = useState(false);

  //const getUsuarios = useUsuariosStore((state) => state.getUsuarios);

  const roles = useRoleStore((state) => state.roles);
  const getRoles = useRoleStore((state) => state.getRoles);

  useEffect(() => {
    getRoles(1000, true);
  }, []);

  const router = useRouter();

  const form = useForm<UsuarioFormSchemaType>({
    resolver: zodResolver(usuarioFormSchema),
    defaultValues: {
      name: usuario.name,
      email: usuario.email,
      id: usuario.id,
      nickname: usuario.nickname,
      activo: usuario.activo,
      password: undefined,
      roles: usuario.role.map((item) => item.id),
    },
  });

  const { handleSubmit } = form;

  async function onSubmit(data: UsuarioFormSchemaType) {
    setLoading(true);
    const resp = await createOrUpdateUsuarioByIdAction(data);
    setLoading(false);
    if (resp.error) {
      toast.error(resp.message);
    } else {
      //await getUsuarios(100);
      toast.success(resp.message);
      router.replace(AppRouter.adminUsuarios);
    }
  }

  return (
    <div>
      <h1 className="py-10">
        {usuario.id === 0 ? "Crear Usuario" : "Actualizar Usuario"}
      </h1>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
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
                  <FormDescription>Nombre del usuario</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*Nickname */}
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apodo</FormLabel>
                  <FormControl>
                    <Input placeholder="Nickname" {...field} />
                  </FormControl>
                  <FormDescription>Apodo del usuario</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre" {...field} type="email" />
                  </FormControl>
                  <FormDescription>Email del usuario</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contrasena</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} type="password" />
                  </FormControl>
                  <FormDescription>Contrasena del usuario</FormDescription>
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

          {/* ROLEs */}
          <div className="mt-5">
            <PermisoClient permiso={PermisoAccion.ROLE_VIEW}>
              <FormField
                control={form.control}
                name="roles"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Card>
                        <CardHeader>
                          <CardTitle>Roles</CardTitle>
                        </CardHeader>

                        <CardContent>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {roles.map((role) => (
                              <div
                                key={role.id}
                                className=" items-center space-x-2 mt-2"
                              >
                                <Checkbox
                                  id={`${role.id}`}
                                  checked={field.value.includes(role.id)}
                                  onCheckedChange={(isChecked) => {
                                    const newPermissions = isChecked
                                      ? [...field.value, role.id]
                                      : field.value.filter(
                                          (id) => id !== role.id
                                        );

                                    field.onChange(newPermissions);
                                  }}
                                />
                                <Label className="text-sm">{role.name}</Label>
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
            </PermisoClient>
          </div>

          <div className="mt-5">
            {usuario.id === 0 ? (
              <PermisoClient permiso={PermisoAccion.USER_CREATE}>
                <Button type="submit" disabled={loading}>
                  Crear Usuario
                </Button>
              </PermisoClient>
            ) : (
              <PermisoClient permiso={PermisoAccion.USER_UPDATE}>
                <Button type="submit" disabled={loading}>
                  Actualizar Usuario
                </Button>
              </PermisoClient>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
