"use client";

import { useForm } from "react-hook-form";
import { ClienteInterface } from "../clientes";
import {
  FacturaFormInterface,
  facturaFormSchema,
  FacturaFormSchemaType,
  ProductosVentasInterface,
} from "../facturas";
import { ProductoInterface } from "../productos";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
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
} from "../ui";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Producto, useVentasStore } from "./ventas.store";
import { toast } from "sonner";
import { createFacturaByIdAction } from "@/actions";
import { useRouter } from "next/navigation";
import { AppRouter } from "@/config";

interface Props {
  facturaForm: FacturaFormInterface;
  clientes: ClienteInterface[];
  productos: ProductoInterface[];
}

export const VentasForm = ({ facturaForm, clientes, productos }: Props) => {
  const [loading, setLoading] = useState(false);

  const [idCliente, setIdCliente] = useState<number>(facturaForm.id_cliente);

  const [productoActual, setProductoActual] = useState<string>("");
  const [cantidadActual, setCantidadActual] = useState<string>("");

  const agregarProducto = useVentasStore((state) => state.agregarProducto);

  const productosSeleccionados = useVentasStore(
    (state) => state.productosSeleccionados
  );

  const removerProducto = useVentasStore((state) => state.removerProducto);

  const realizarCompra = useVentasStore((state) => state.realizarCompra);

  const total = useVentasStore((state) => state.total);

  const router = useRouter();

  const form = useForm<FacturaFormSchemaType>({
    resolver: zodResolver(facturaFormSchema),
    defaultValues: {
      activo: facturaForm.activo,
      faltante: facturaForm.faltante,
      id: facturaForm.id,
      id_cliente: facturaForm.id_cliente,
      is_credito: facturaForm.is_credito,
      productos: facturaForm.productos,
      total: facturaForm.total,
      total_pagado: facturaForm.total_pagado,
    },
  });

  const { handleSubmit } = form;

  async function onSubmit(data: FacturaFormSchemaType) {
    setLoading(true);
    const new_productos: ProductosVentasInterface[] =
      productosSeleccionados.map((i) => {
        return { id_producto: i.id, cantidad: i.cantidad };
      });

    if (total === 0 || new_productos.length === 0) {
      toast.error("No tienes ningun producto");
      setLoading(false);
      return;
    }

    const newFactura: FacturaFormInterface = {
      activo: data.activo,
      faltante: data.faltante,
      id: data.id,
      id_cliente: idCliente,
      is_credito: data.is_credito,
      total: total,
      total_pagado: data.total_pagado,
      productos: new_productos,
    };

    const resp = await createFacturaByIdAction(newFactura);
    if (resp.error) {
      toast.error(`Error => ${resp.message}`);
      setLoading(false);
      return;
    }
    realizarCompra();
    setLoading(false);
    toast.success(`Procesado`);
    router.replace(`${AppRouter.adminFactura}/${resp.id}`);
  }

  const handleAgregarProducto = () => {
    if (productoActual && cantidadActual) {
      const producto = productos.find(
        (p) => p.id === Number.parseInt(productoActual)
      );
      if (producto) {
        const newProducto: Producto = {
          id: producto.id,
          name: producto.name,
          price: producto.price,
        };
        agregarProducto(newProducto, Number.parseInt(cantidadActual));
        setProductoActual("");
        setCantidadActual("");
      }
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 gap-4">
            {/* Primera tarjeta: Clientes, Productos y Productos seleccionados */}
            <Card className="col-span-3 p-4">
              <h2 className="text-lg font-bold mb-4">Gestión de Venta</h2>

              <div className="grid grid-cols-3 gap-4">
                {/* Cliente */}
                <FormField
                  control={form.control}
                  name="id_cliente"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cliente</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(parseInt(value, 10));
                          setIdCliente(parseInt(value, 10));
                        }}
                        defaultValue={`${field.value}`}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el Cliente" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {clientes.map((item) => (
                            <SelectItem value={`${item.id}`} key={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Cliente seleccionado</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Switch de Crédito */}
                <FormField
                  control={form.control}
                  name="is_credito"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start mt-4">
                      <FormLabel>Crédito</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Agregar Producto */}
              <h3 className="text-lg font-medium mt-6">Agregar Producto</h3>
              <div className="flex items-center space-x-2 mt-2">
                <Select
                  onValueChange={setProductoActual}
                  value={productoActual}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un producto" />
                  </SelectTrigger>
                  <SelectContent>
                    {productos.map((producto) => (
                      <SelectItem key={producto.id} value={`${producto.id}`}>
                        {producto.name} - ${producto.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  min="1"
                  value={cantidadActual}
                  onChange={(e) => setCantidadActual(e.target.value)}
                  placeholder="Cantidad"
                  className="w-28"
                />
                <Button
                  onClick={handleAgregarProducto}
                  size="icon"
                  type="button"
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Agregar producto</span>
                </Button>
              </div>

              {/* Productos Seleccionados */}
              <h3 className="text-lg font-medium mt-6">
                Productos Seleccionados
              </h3>
              <table className="min-w-full table-auto border-collapse border mt-2">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Producto</th>
                    <th className="px-4 py-2 text-left">Cantidad</th>
                    <th className="px-4 py-2 text-left">Precio Total</th>
                    <th className="px-4 py-2 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productosSeleccionados.map((producto, index) => (
                    <tr key={producto.id}>
                      <td className="px-4 py-2">{producto.name}</td>
                      <td className="px-4 py-2">{producto.cantidad}</td>
                      <td className="px-4 py-2">
                        ${producto.price * producto.cantidad}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <Button
                          onClick={() => removerProducto(Number(producto.id))}
                          size="icon"
                          variant="ghost"
                          type="button"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remover producto</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            {/* Segunda tarjeta: Monto a pagar y botón de pagar */}
            <Card className="col-span-1 p-4">
              <h2 className="text-lg font-bold mb-4">Resumen</h2>

              {/* Total */}
              <div className="mt-2">
                <label className="block text-sm font-medium">Total</label>
                <span className="text-xl font-bold">${total.toFixed(2)}</span>
              </div>

              {/* Monto a Pagar */}
              <FormField
                control={form.control}
                name="total_pagado"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Monto a Pagar</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Botón de Pagar */}
              <Button type="submit" disabled={loading} className="mt-6 w-full">
                Pagar
              </Button>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
};
