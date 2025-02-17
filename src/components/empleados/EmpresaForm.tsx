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
  Calendar,
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
import { convertirDateAString } from "@/lib";
import { parseISO } from "date-fns";

interface Props {
  empresa: EmpresaInterface;
}

export const EmpresaForm = ({ empresa }: Props) => {
  const [loading, setLoading] = useState(false);
  const newFecha = empresa.id === 0 ? "" : empresa.fecha;
  const [date, setDate] = useState<Date>(
    newFecha ? parseISO(newFecha) : new Date()
  );

  const router = useRouter();

  const form = useForm<EmpresaFormSchemaType>({
    resolver: zodResolver(empresaFormSchema),
    defaultValues: {
      activo: empresa.activo,
      descripcion: empresa.descripcion,
      id: empresa.id,
      name: empresa.name,
      codigo: empresa.codigo,
      cedula: empresa.cedula,
      sueldo: empresa.sueldo,
      fecha:empresa.fecha
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
      router.replace(AppRouter.adminEmpleados);
    }
  }
  return (
    <div>
      <h1 className="py-3 text-lg font-semibold md:text-2xl mb-2">
        {empresa.id === 0 ? "Crear Empleado" : "Actualizar Empleado"}
      </h1>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
            {/*Fecha*/}
            <FormField
              control={form.control}
              name="fecha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de ingreso {`${field.value}`}</FormLabel>
                  <FormControl>
                    <Calendar
                      disabled={empresa.id === 0 ? false : true}
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => {
                        const fecha = newDate || new Date();
                        setDate(fecha);
                        const newFecha = convertirDateAString(fecha);
                        field.onChange(newFecha);
                      }}
                      initialFocus
                      toDate={new Date()}
                    />
                  </FormControl>
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
                  <FormDescription>Nombre del Empleado</FormDescription>
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
                  <FormLabel>Cargo</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descripcion" {...field} />
                  </FormControl>
                  <FormDescription>Cargo del empleado</FormDescription>
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
                  <FormDescription>Codigo del Empleado</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* CEDULA */}
            <FormField
              control={form.control}
              name="cedula"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEDULA</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value, 10)}
                    />
                  </FormControl>
                  <FormDescription>Cedula del empleado</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sueldo */}
            <FormField
              control={form.control}
              name="sueldo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sueldo del empelado</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormDescription>Sueldo del Empleado</FormDescription>
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
                  Crear Empleado
                </Button>
              </PermisoClient>
            ) : (
              <PermisoClient permiso={PermisoAccion.EMPRESA_UPDATE}>
                <Button type="submit" disabled={loading}>
                  Actualizar Empleado
                </Button>
              </PermisoClient>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
