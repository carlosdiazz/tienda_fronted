import { validateProperty } from "@/lib";
import { ProductoInterface } from "./producto.interface";
import { ProveedorMapper } from "../proveedores";

export const ProductoMapper = (data: any): ProductoInterface => {
  return {
    id: validateProperty<number>(data, "id", "number"),
    name: validateProperty<string>(data, "name", "string"),
    descripcion: validateProperty<string>(data, "descripcion", "string"),
    activo: validateProperty<boolean>(data, "activo", "boolean"),
    codigo: validateProperty<number>(data, "codigo", "number"),
    price_de_compra: validateProperty<number>(
      data,
      "price_de_compra",
      "number"
    ),
    price: validateProperty<number>(data, "price", "number"),
    stock: validateProperty<number>(data, "stock", "number"),
    stock_minimo: validateProperty<number>(data, "stock_minimo", "number"),
    is_service: validateProperty<boolean>(data, "is_service", "boolean"),
    proveedor:
      data["proveedor"] != null
        ? ProveedorMapper(data["proveedor"])
        : undefined,
  };
};

export const GetProductosResponse = (data: any): ProductoInterface[] => {
  const productos: ProductoInterface[] = [];
  for (const key of data) {
    const producto = ProductoMapper(key);
    productos.push(producto);
  }
  return productos;
};
