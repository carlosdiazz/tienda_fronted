"use client";

import React, { useState } from "react";
import {
  empresaFormSchema,
  EmpresaFormSchemaType,
  EmpresaInterface,
} from "./empresa.interface";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateOrCreateEmpresaByIdAction } from "@/actions";
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

interface Props {
  empresa: EmpresaInterface;
}

export const EmpresaForm = ({ empresa }: Props) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<EmpresaFormSchemaType>({
    resolver: zodResolver(empresaFormSchema),
    defaultValues: {
      activo: empresa.activo,
      descripcion: empresa.descripcion,
      id: empresa.id,
      img_url: empresa.img_url?empresa.img_url:"https://i.ibb.co/kqJmz8F/empresa.jpg",
      name: empresa.name,
      codigo: empresa.codigo,
      rnc:empresa.rnc
    },
  });
  const { handleSubmit } = form;

  async function onSubmit(data: EmpresaFormSchemaType) {
    setLoading(true);
    const resp = await updateOrCreateEmpresaByIdAction(data);
    setLoading(false);

    if (resp.error) {
      toast.error(resp.message);
    } else {
      toast.success(resp.message);
      router.replace(AppRouter.adminEmpresas);
    }
  }
  return (
    <div>
      <h1 className="py-3 text-lg font-semibold md:text-2xl mb-2">
        {empresa.id === 0 ? "Crear Empresa" : "Actualizar Empresa"}
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
                  <FormDescription>Nombre de la Empresa</FormDescription>
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
                  <FormDescription>Descripcion de la Empresa</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*Img Url */}
            <FormField
              control={form.control}
              name="img_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Img URL" {...field} />
                  </FormControl>
                  <FormDescription>Imagen URL de la Empresa</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Codigo */}
            <FormField
              control={form.control}
              name="codigo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Codigo</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormDescription>Codigo de la Empresa</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* RNC */}
            <FormField
              control={form.control}
              name="rnc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RNC</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormDescription>RNC de la Empresa</FormDescription>
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
            {empresa.id === 0 ? (
              <PermisoClient permiso={PermisoAccion.EMPRESA_CREATE}>
                <Button type="submit" disabled={loading}>
                  Crear Empresa
                </Button>
              </PermisoClient>
            ) : (
              <PermisoClient permiso={PermisoAccion.EMPRESA_UPDATE}>
                <Button type="submit" disabled={loading}>
                  Actualizar Empresa
                </Button>
              </PermisoClient>
            )}
          </div>
        </form>
      </Form>

    </div>
  );
};
