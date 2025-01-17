"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { AppRouter, PermisoAccion } from "@/config";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Switch,
  Textarea,
} from "../ui";
import { PermisoClient } from "../common";

import { updateOrCreateProveedorByIdAction } from "@/actions";
import { proveedorFormSchema, ProveedorFormSchemaType, ProveedorInterface } from "./comprobante.interface";

interface Props {
  proveedor: ProveedorInterface;
}

export const ProveedorForm = ({ proveedor }: Props) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<ProveedorFormSchemaType>({
    resolver: zodResolver(proveedorFormSchema),
    defaultValues: {
      activo: proveedor.activo,
      descripcion: proveedor.descripcion,
      id: proveedor.id,
      name: proveedor.name,
      direccion: proveedor.direccion,
      telefono: proveedor.telefono
    },
  });
  const { handleSubmit } = form;

  async function onSubmit(data: ProveedorFormSchemaType) {
    setLoading(true);
    const resp = await updateOrCreateProveedorByIdAction(data);
    setLoading(false);

    if (resp.error) {
      toast.error(resp.message);
    } else {
      toast.success(resp.message);
      router.replace(AppRouter.adminProveedores);
    }
  }
  return (
    <div>
      <h1 className="py-3 text-lg font-semibold md:text-2xl mb-2">
        {proveedor.id === 0 ? "Crear Proveedor" : "Actualizar Proveedor"}
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
                  <FormDescription>Nombre del Provvedor</FormDescription>
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
                  <FormDescription>Descripcion del Proveedor</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*Direccion */}
            <FormField
              control={form.control}
              name="direccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Direccion</FormLabel>
                  <FormControl>
                    <Input placeholder="Direccion" {...field} />
                  </FormControl>
                  <FormDescription>Direccion del Proveedor</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

                        {/*Telefono */}
                        <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefono</FormLabel>
                  <FormControl>
                    <Input placeholder="Telefono" {...field} />
                  </FormControl>
                  <FormDescription>Telefono del Proveedor</FormDescription>
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

          <div className="mt-10">
            {proveedor.id === 0 ? (
              <PermisoClient permiso={PermisoAccion.PROVEEDOR_CREATE}>
                <Button type="submit" disabled={loading}>
                  Crear Proveedor
                </Button>
              </PermisoClient>
            ) : (
              <PermisoClient permiso={PermisoAccion.PRODUCTOS_UPDATE}>
                <Button type="submit" disabled={loading}>
                  Actualizar Proveedor
                </Button>
              </PermisoClient>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
