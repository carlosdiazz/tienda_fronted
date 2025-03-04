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
import {
  emptyFactura,
  FacturaDetalle,
  FacturaInterface,
  useFacturaStore,
} from "../facturas";

interface Props {
  comprobante: ComprobanteInterface;
}

export const ComprobanteForm = ({ comprobante }: Props) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const facturas = useFacturaStore((state) => state.factura);
  const getFacturas = useFacturaStore((state) => state.getFactura);

  const [facturaSelect, setFacturaSelect] =
    useState<FacturaInterface>(emptyFactura);

  useEffect(() => {
    getFacturas(1000, false, null); //TODO
  }, []);

  const form = useForm<ComprobanteFormSchemaType>({
    resolver: zodResolver(comprobanteFormSchema),
    defaultValues: {
      concepto: comprobante.concepto,
      id: comprobante.id,
      monto_pagado: comprobante.monto_pagado,
      id_facura: 0,
      referencia_pago: comprobante.referencia_pago,
      metodo_pago: comprobante.metodo_pago,
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
      <div>
        <FacturaDetalle factura={facturaSelect} />
      </div>

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
                    onValueChange={(value) => {
                      field.onChange(parseInt(value, 10));
                      const facturaEncontrada = facturas.find(
                        (item) => item.id === parseInt(value, 10)
                      );
                      if (facturaEncontrada) {
                        setFacturaSelect(facturaEncontrada); // Actualiza el estado con la factura seleccionada
                      }
                    }}
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

            {/* Referencia de Pago */}
            <FormField
              control={form.control}
              name="referencia_pago"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Referencia de Pago</FormLabel>
                  <FormControl>
                    <Input placeholder="Referencia de Pago" {...field} />
                  </FormControl>
                  <FormDescription>Referencia de Pago</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Método de Pago */}
            <FormField
              control={form.control}
              name="metodo_pago"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de Pago</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un método" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="EFECTIVO">EFECTIVO</SelectItem>
                      <SelectItem value="TARJETA">TARJETA</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Selecciona el método de pago
                  </FormDescription>
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
