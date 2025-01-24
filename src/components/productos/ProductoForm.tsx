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
  productoFormSchema,
  ProductoFormSchemaType,
  ProductoInterface,
} from "./producto.interface";
import { updateOrCreateProductoByIdAction } from "@/actions";

interface Props {
  producto: ProductoInterface;
}

export const ProductoForm = ({ producto }: Props) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<ProductoFormSchemaType>({
    resolver: zodResolver(productoFormSchema),
    defaultValues: {
      activo: producto.activo,
      descripcion: producto.descripcion,
      id: producto.id,
      name: producto.name,
      codigo: producto.codigo,
      price: producto.price,
      stock: producto.stock,
      is_service: producto.is_service,
      stock_minimo: producto.stock_minimo
    },
  });
  const { handleSubmit } = form;

  async function onSubmit(data: ProductoFormSchemaType) {
    setLoading(true);
    const resp = await updateOrCreateProductoByIdAction(data);
    setLoading(false);

    if (resp.error) {
      toast.error(resp.message);
    } else {
      toast.success(resp.message);
      router.replace(AppRouter.adminProductos);
    }
  }
  return (
    <div>
      <h1 className="py-3 text-lg font-semibold md:text-2xl mb-2">
        {producto.id === 0 ? "Crear Producto" : "Actualizar Producto"}
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
                  <FormDescription>Nombre del Producto</FormDescription>
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
                  <FormDescription>Descripcion del Producto</FormDescription>
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
                  <FormDescription>Codigo del Producto</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Precio */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormDescription>Precio del Producto</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Stock */}
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormDescription>Stock del Producto</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Stock Minimo*/}
            <FormField
              control={form.control}
              name="stock_minimo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Minimo</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormDescription>Stock Minimo del Producto</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*Activo*/}
            <FormField
              control={form.control}
              name="is_service"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="inline-flex items-center space-x-4">
                      <FormLabel>Servicio</FormLabel>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </FormControl>
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
            {producto.id === 0 ? (
              <PermisoClient permiso={PermisoAccion.PRODUCTOS_CREATE}>
                <Button type="submit" disabled={loading}>
                  Crear Producto
                </Button>
              </PermisoClient>
            ) : (
              <PermisoClient permiso={PermisoAccion.PRODUCTOS_UPDATE}>
                <Button type="submit" disabled={loading}>
                  Actualizar Producto
                </Button>
              </PermisoClient>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
