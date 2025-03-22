"use client";

import React, { useEffect, useState } from "react";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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
import { useProveedorStore } from "../proveedores";

interface Props {
  producto: ProductoInterface;
}

export const ProductoForm = ({ producto }: Props) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const proveedores = useProveedorStore((state) => state.proveedores);
  const getProveedores = useProveedorStore((state) => state.getProveedores);

  useEffect(() => {
    getProveedores(10000, true);
  }, []);

  const form = useForm<ProductoFormSchemaType>({
    resolver: zodResolver(productoFormSchema),
    defaultValues: {
      activo: producto.activo,
      descripcion: producto.descripcion,
      id: producto.id,
      name: producto.name,
      codigo: producto.codigo,
      price: producto.price,
      price_de_compra: producto.price_de_compra,
      stock: producto.stock,
      is_service: producto.is_service,
      stock_minimo: producto.stock_minimo,
      id_proveedor: producto.proveedor?.id ?? 0,
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
            {/* Proveedor */}
            <FormField
              control={form.control}
              name="id_proveedor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proveedor</FormLabel>
                  <Select
                    onValueChange={(value) =>
                      field.onChange(parseInt(value, 10))
                    }
                    defaultValue={`${field.value}`}
                    disabled={producto.id === 0 ? false : true}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el Proveedor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {proveedores.map((item) => (
                        <SelectItem value={`${item.id}`} key={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Loteria seleccionada</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            {/* Precio De Venta */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio De Venta</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormDescription>Precio De Venta</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Precio De Compra*/}
            <FormField
              control={form.control}
              name="price_de_compra"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio De Compra</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormDescription>Precio De Compra</FormDescription>
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
