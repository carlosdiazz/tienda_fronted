"use client";

import {
  Button,
  ClienteInterface,
  EmptyEntity,
  FacturaGrid,
  FacturaInterface,
  LoadingPage,
  PermisoClient,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  useCLienteStore,
  useFacturaStore,
  useFavoritosStore,
} from "@/components";
import { AppRouter, PermisoAccion } from "@/config";
import { UpdateIcon } from "@radix-ui/react-icons";
import { Star, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function FacturaPage() {
  const [isPaid, setIsPaid] = useState<boolean | null>(null);
  const [id_cliente, setId_cliente] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [activo, setActivo] = useState(true);

  const handleSelectPaidChange = (value: string) => {
    if (value === "true") {
      setIsPaid(true);
    } else if (value === "false") {
      setIsPaid(false);
    } else {
      setIsPaid(null);
    }
  };

  const handleSelectChange = (value: string) => {
    if (value === "true") {
      setActivo(true);
    } else {
      setActivo(false);
    }
  };

  const factura: FacturaInterface[] = useFacturaStore((state) => state.factura);
  const getFactura = useFacturaStore((state) => state.getFactura);
  const loadingFactura = useFacturaStore((state) => state.loading);

  const clientes: ClienteInterface[] = useCLienteStore(
    (state) => state.clientes
  );
  const getClientes = useCLienteStore((state) => state.getClientes);

  const permiso = PermisoAccion.FACTURA_VIEW;
  const toggleFavorites = useFavoritosStore((state) => state.toggleFavorites);
  const isFavorite = useFavoritosStore((state) => state.isFavorite(permiso));

  const onSubmit = async () => {
    setIsLoading(true);
    await getFactura(10000, isPaid, id_cliente, activo);
    setIsLoading(false);
    toast.success("Factura Actualizada");
  };

  useEffect(() => {
    getClientes(999, true);
  }, []);

  useEffect(() => {
    getFactura(1000, isPaid, id_cliente, activo);
  }, [isPaid, id_cliente, activo]);

  const handleSelectClienteChange = (value: string) => {
    if (value === "0") {
      setId_cliente(null);
    } else {
      const cliente = Number(value);
      setId_cliente(cliente);
    }
  };

  return (
    <div>
      <div className="w-full mx-auto py-2 px-2">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex gap-4">
            <Button onClick={() => toggleFavorites(permiso)}>
              {isFavorite ? <TrashIcon /> : <Star />}
            </Button>
            <h1 className="text-lg font-semibold md:text-2xl mb-2">Facturas</h1>
          </div>

          <div className="flex justify-end m-2 gap-x-4">
            <Select
              onValueChange={handleSelectClienteChange}
              value={id_cliente?.toString()}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Clientes" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Clientes</SelectLabel>
                  <SelectItem value={`0`} key="0">
                    Todos
                  </SelectItem>
                  {clientes.map((item) => (
                    <SelectItem value={`${item.id}`} key={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              onValueChange={handleSelectPaidChange}
              value={isPaid?.toString()}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Estado Factura</SelectLabel>
                  <SelectItem value="null">Todas</SelectItem>
                  <SelectItem value="true">Pagadas</SelectItem>
                  <SelectItem value="false">Pendientes</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              onValueChange={handleSelectChange}
              value={activo.toString()}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Vigentes" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Pendientes</SelectLabel>
                  <SelectItem value="true">Vigentes</SelectItem>
                  <SelectItem value="false">Anuladas</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <PermisoClient permiso={PermisoAccion.FACTURA_CREATE}>
              <Link href={`${AppRouter.adminFactura}/0`}>
                <Button>Registrar Nuevo Factura +</Button>
              </Link>
            </PermisoClient>

            <Button onClick={onSubmit} disabled={isLoading}>
              <UpdateIcon />
            </Button>
          </div>
        </div>

        {loadingFactura === true ? (
          <LoadingPage />
        ) : factura.length === 0 ? (
          <EmptyEntity
            title="No hay Factura creada"
            subTitle="Para crear un nuevoa Factura pulsa '+'"
          />
        ) : (
          <FacturaGrid facturas={factura} />
        )}
      </div>
    </div>
  );
}
