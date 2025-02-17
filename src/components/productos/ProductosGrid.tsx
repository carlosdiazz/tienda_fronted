"use client";

import { AppRouter, PermisoAccion } from "@/config";
import { PermisoClient } from "../common";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Label,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui";

import { useState } from "react";

import { toast } from "sonner";
import Link from "next/link";
import { ProductoInterface } from "./producto.interface";
import { useProductosStore } from "./productos.store";
import { removeProductoAction } from "@/actions";
import { ChevronLeft, ChevronRight, Edit } from "lucide-react";

interface Props {
  productos: ProductoInterface[];
}

const PRODUCTS_PER_PAGE = 10;

export const ProductosGrid = ({ productos }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(productos.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = productos.slice(startIndex, endIndex);

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  return (
    <div className="container">
      <Card>
        <CardHeader>Lista de Productos</CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Codigo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Servicio</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.codigo}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    <Badge>{product.is_service ? "SI" : "NO"}</Badge>
                  </TableCell>
                  <TableCell>
                    <PermisoClient permiso={PermisoAccion.PRODUCTOS_UPDATE}>
                      <Link href={`${AppRouter.adminProductos}/${product.id}`}>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                    </PermisoClient>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>
          <div className="text-sm text-muted-foreground">
            Página {currentPage} de {totalPages}
          </div>
          <Button
            variant="outline"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Siguiente
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
      {/*
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productos.map((producto) => (
              <ProductoCard producto={producto} key={producto.id} />
            ))}
          </div>
      */}
    </div>
  );
};

interface PropsProducto {
  producto: ProductoInterface;
}

export const ProductoCard = ({ producto }: PropsProducto) => {
  const [isLoading, setIsLoading] = useState(false);
  const getProductos = useProductosStore((state) => state.getProductos);

  const onDelete = async () => {
    setIsLoading(true);
    const resp = await removeProductoAction(producto.id);
    setIsLoading(false);
    if (resp.error) {
      toast.error(resp.message);
    } else {
      await getProductos(100, true);
      toast.success(resp.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between gap-4">
          <div className="flex items-center gap-3">
            <Badge className="h-8" variant={"info"}>
              #: {producto.codigo}
            </Badge>
            <Badge className="h-8" variant={"info"}>
              Stock: {producto.stock}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <h3 className="text-lg font-semibold">{producto.name}</h3>
        <p className="text-muted-foreground">{producto.descripcion}</p>

        <div className="flex items-center space-x-2 mt-4">
          <Switch checked={producto.activo} />
          <Label>Activo</Label>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-x-2">
        <PermisoClient permiso={PermisoAccion.PRODUCTOS_DELETE}>
          <Button variant="destructive" disabled={isLoading} onClick={onDelete}>
            Eliminar
          </Button>
        </PermisoClient>

        <PermisoClient permiso={PermisoAccion.PRODUCTOS_UPDATE}>
          <Link href={`${AppRouter.adminProductos}/${producto.id}`}>
            <Button variant="default">Editar</Button>
          </Link>
        </PermisoClient>

        <PermisoClient permiso={PermisoAccion.PRODUCTOS_VIEW}>
          <Link href={`${AppRouter.adminProductos}/${producto.id}`}>
            <Button variant="secondary">Ver</Button>
          </Link>
        </PermisoClient>
      </CardFooter>
    </Card>
  );
};
