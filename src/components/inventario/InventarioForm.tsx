"use client";

import { useState } from "react";
import {
  InventarioFormInterface,
  InventarioFormSchemaType,
  InventarioInterface,
  inventarioFormSchema,
} from "./inventario.interface";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInventarioAction } from "@/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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
import { ProductoInterface } from "../productos";
import { PermisoClient } from "../common";


interface Props {
  productos: ProductoInterface[];
  inventario: InventarioInterface;
}

export const InventarioForm = ({ inventario, productos }: Props) => {
  const [loading, setLoading] = useState(false);
  const [idProducto, setIdProducto] = useState<number>(0);

  const router = useRouter();

  const form = useForm<InventarioFormSchemaType>({
    resolver: zodResolver(inventarioFormSchema),
    defaultValues: {
      cantidad: inventario.cantidad,
      concepto: inventario.concepto,
      id: 0,
      id_producto: 0,
      is_ingreso: true,
      is_credito:inventario.is_credito
    },
  });

  const { handleSubmit } = form;

  async function onSubmit(data: InventarioFormSchemaType) {
    setLoading(true);

    const newInventario: InventarioFormInterface = {
      id: 0,
      cantidad: data.cantidad,
      concepto: data.concepto,
      is_ingreso: true,
      id_producto: idProducto,
      is_credito: data.is_credito,
    };
    const resp = await createInventarioAction(newInventario);
    if (resp.error) {
      toast.error(`Error => ${resp.message}`);
      setLoading(false);
      return;
    }

    setLoading(false);
    toast.success(`Procesado`);
    router.replace(AppRouter.adminInventario);
  }

  return (
    <div>
      <div>
        <h1 className="py-3 text-lg font-semibold md:text-2xl mb-2">
          Registrar Nueva Mercancia
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-4">
            {/* Producto */}
            <FormField
              control={form.control}
              name="id_producto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Producto</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(parseInt(value, 10));
                      setIdProducto(parseInt(value, 10));
                    }}
                    defaultValue={`${field.value}`}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el Producto" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {productos.map((item) => (
                        <SelectItem value={`${item.id}`} key={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Producto seleccionado</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*Concepto */}
            <FormField
              control={form.control}
              name="concepto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Concepto</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Concepto" {...field} />
                  </FormControl>
                  <FormDescription>Concepto</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cantidad */}
            <FormField
              control={form.control}
              name="cantidad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormDescription>Cantidad</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*Credito*/}
            <FormField
              control={form.control}
              name="is_credito"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="inline-flex items-center space-x-4">
                      <FormLabel>Es Credito?</FormLabel>
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
            <PermisoClient permiso={PermisoAccion.INVENTARIO_CREATE}>
              <Button type="submit" disabled={loading}>
                Guardar
              </Button>
            </PermisoClient>
          </div>
        </form>
      </Form>
    </div>
  );
};
