"use client";

import {
  Button,
  EmptyEntity,
  LoadingPage,
  PermisoClient,
  ProductoInterface,
  ProductosGrid,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  useFavoritosStore,
  useProductosStore,
  useProveedorStore,
} from "@/components";
import { AppRouter, PermisoAccion } from "@/config";
import { UpdateIcon } from "@radix-ui/react-icons";
import { Star, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProductosPage() {
  const [activo, setActivo] = useState(true);
  const [is_stock_minimo, set_is_stock_minimo] = useState<string>("todos");
  const [isLoading, setIsLoading] = useState(false);
  const [id_proveedor, set_id_proveedor] = useState<number | undefined>(
    undefined
  );

  const handleSelectChange = (value: string) => {
    if (value === "true") {
      setActivo(true);
    } else {
      setActivo(false);
    }
  };

  const handleSelectStockChange = (value: string) => {
    if (value === "true") {
      set_is_stock_minimo("true");
    } else if (value === "false") {
      set_is_stock_minimo("false");
    } else {
      set_is_stock_minimo("todos");
    }
  };

  const productos: ProductoInterface[] = useProductosStore(
    (state) => state.productos
  );
  const getProductos = useProductosStore((state) => state.getProductos);
  const loadingProducto = useProductosStore((state) => state.loading);

  const permiso = PermisoAccion.PRODUCTOS_VIEW;
  const toggleFavorites = useFavoritosStore((state) => state.toggleFavorites);
  const isFavorite = useFavoritosStore((state) => state.isFavorite(permiso));

  const onSubmit = async () => {
    setIsLoading(true);
    await getProductos(10000, activo);
    setIsLoading(false);
    toast.success("Productos Actualizadas");
  };

  const proveedores = useProveedorStore((state) => state.proveedores);
  const getProveedores = useProveedorStore((state) => state.getProveedores);

  useEffect(() => {
    getProveedores(1000, true);
  }, []);

  useEffect(() => {
    getProductos(1000, activo, undefined, id_proveedor, is_stock_minimo);
  }, [activo, id_proveedor, is_stock_minimo]);

  const handleSelectClienteChange = (value: string) => {
    if (value === "0") {
      set_id_proveedor(undefined);
    } else {
      const proveedor = Number(value);
      set_id_proveedor(proveedor);
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
            <h1 className="text-lg font-semibold md:text-2xl mb-2">
              Productos
            </h1>
          </div>

          <div className="flex justify-end m-2 gap-x-4">
            <Select
              onValueChange={handleSelectStockChange}
              value={is_stock_minimo?.toString()}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Stock</SelectLabel>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="false">Normal</SelectItem>
                  <SelectItem value="true">Bajo</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              onValueChange={handleSelectClienteChange}
              value={id_proveedor?.toString()}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Proveedores" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Proveedores</SelectLabel>
                  <SelectItem value={`0`} key="0">
                    Todos
                  </SelectItem>
                  {proveedores.map((item) => (
                    <SelectItem value={`${item.id}`} key={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Activo" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Activo</SelectLabel>
                  <SelectItem value="true">Activo</SelectItem>
                  <SelectItem value="false">Inactivo</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <PermisoClient permiso={PermisoAccion.PRODUCTOS_CREATE}>
              <Link href={`${AppRouter.adminProductos}/0`}>
                <Button>+</Button>
              </Link>
            </PermisoClient>

            <Button onClick={onSubmit} disabled={isLoading}>
              <UpdateIcon />
            </Button>
          </div>
        </div>

        {loadingProducto === true ? (
          <LoadingPage />
        ) : productos.length === 0 ? (
          <EmptyEntity
            title="No hay Productos creado"
            subTitle="Para crear un nuevo producto pulsa '+'"
          />
        ) : (
          <ProductosGrid productos={productos} />
        )}
      </div>
    </div>
  );
}
