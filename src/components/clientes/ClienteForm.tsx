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
import {
  clienteFormSchema,
  ClienteFormSchemaType,
  ClienteInterface,
} from "./clientes.interface";
import { updateOrCreateClienteByIdAction } from "@/actions";

interface Props {
  cliente: ClienteInterface;
}

export const ClienteForm = ({ cliente }: Props) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<ClienteFormSchemaType>({
    resolver: zodResolver(clienteFormSchema),
    defaultValues: {
      activo: cliente.activo,
      id: cliente.id,
      name: cliente.name,
      telefono: cliente.telefono,
      documento: cliente.documento,
      tipo_documento: cliente.tipo_documento,
    },
  });
  const { handleSubmit } = form;

  async function onSubmit(data: ClienteFormSchemaType) {
    setLoading(true);
    const resp = await updateOrCreateClienteByIdAction(data);
    setLoading(false);

    if (resp.error) {
      toast.error(resp.message);
    } else {
      toast.success(resp.message);
      router.replace(AppRouter.adminClientes);
    }
  }
  return (
    <div>
      <h1 className="py-3 text-lg font-semibold md:text-2xl mb-2">
        {cliente.id === 0 ? "Crear Cliente" : "Actualizar Cliente"}
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
                  <FormDescription>Nombre del Cliente</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*Documento */}
            <FormField
              control={form.control}
              name="documento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Documento</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Documento" {...field} />
                  </FormControl>
                  <FormDescription>Documento</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*Tipo de Documento */}
            <FormField
              control={form.control}
              name="tipo_documento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Documento</FormLabel>
                  <FormControl>
                    <Input placeholder="Tipo de Documento" {...field} />
                  </FormControl>
                  <FormDescription>Tipo de Docmento</FormDescription>
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
                  <FormDescription>Telefono</FormDescription>
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
            {cliente.id === 0 ? (
              <PermisoClient permiso={PermisoAccion.CLIENTE_CREATE}>
                <Button type="submit" disabled={loading}>
                  Crear Cliente
                </Button>
              </PermisoClient>
            ) : (
              <PermisoClient permiso={PermisoAccion.CLIENTE_UPDATE}>
                <Button type="submit" disabled={loading}>
                  Actualizar Cliente
                </Button>
              </PermisoClient>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
