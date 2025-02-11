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
} from "../ui";
import { PermisoClient } from "../common";

import { updateOrCreateComprobanteByIdAction } from "@/actions";
import {
  ComprobanteInterface,
  ComprobanteFormSchemaType,
  comprobanteFormSchema,
} from "./comprobante.interface";
import { useFacturaStore } from "../facturas";

interface Props {
  comprobante: ComprobanteInterface;
}

export const ComprobanteForm = ({ comprobante }: Props) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const facturas = useFacturaStore((state) => state.factura);
  const getFacturas = useFacturaStore((state) => state.getFactura);

  useEffect(() => {
    getFacturas(1000, true);
  }, []);

  const form = useForm<ComprobanteFormSchemaType>({
    resolver: zodResolver(comprobanteFormSchema),
    defaultValues: {
      concepto: comprobante.concepto,
      id: comprobante.id,
      monto_pagado: comprobante.monto_pagado,
      id_facura: 0,
    },
  });
  const { handleSubmit } = form;

  async function onSubmit(data: ComprobanteFormSchemaType) {
    setLoading(true);
    const resp = await updateOrCreateComprobanteByIdAction(data);
    setLoading(false);

    if (resp.error) {
      toast.error(resp.message);
    } else {
      toast.success(resp.message);
      router.replace(AppRouter.adminComprobante);
    }
  }
  return (
    <div>
      <h1 className="py-3 text-lg font-semibold md:text-2xl mb-2">
        {comprobante.id === 0 ? "Crear Comprobante" : "Actualizar Comprobante"}
      </h1>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
            {/* Factura */}
            <FormField
              control={form.control}
              name="id_facura"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Factura</FormLabel>
                  <Select
                    onValueChange={(value) =>
                      field.onChange(parseInt(value, 10))
                    }
                    defaultValue={`${field.value}`}
                    disabled={comprobante.id === 0 ? false : true}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona la Factura" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {facturas.map((item) => (
                        <SelectItem value={`${item.id}`} key={item.id}>
                          {item.codigo_factura}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Factura seleccionada</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Concepto */}
            <FormField
              control={form.control}
              name="concepto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Concepto</FormLabel>
                  <FormControl>
                    <Input placeholder="Concepto" {...field} />
                  </FormControl>
                  <FormDescription>Concepto</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Total */}
            <FormField
              control={form.control}
              name="monto_pagado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monto Pagado</FormLabel>
                  <FormControl>
                    <Input
                        type="number"
                        inputMode="numeric"
                        pattern="\d*"
                        step="any"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10))
                        }
                    />
                  </FormControl>
                  <FormDescription>Monto Pagado</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-10">
            {comprobante.id === 0 ? (
              <PermisoClient permiso={PermisoAccion.COMPROBANTE_CREATE}>
                <Button type="submit" disabled={loading}>
                  Crear Comprobante
                </Button>
              </PermisoClient>
            ) : (
              <PermisoClient permiso={PermisoAccion.COMPROBANTE_UPDATE}>
                <Button type="submit" disabled={loading}>
                  Actualizar Comprobante
                </Button>
              </PermisoClient>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
