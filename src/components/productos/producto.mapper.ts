import { validateProperty } from "@/lib";
import { ProductoInterface } from "./producto.interface";

export const ProductoMapper = (data: any): ProductoInterface => {
  return {
    id: validateProperty<number>(data, "id", "number"),
    name: validateProperty<string>(data, "name", "string"),
    descripcion: validateProperty<string>(data, "descripcion", "string"),
    img_url: data["img_url"],
    activo: validateProperty<boolean>(data, "activo", "boolean"),
    codigo: validateProperty<number>(data, "codigo", "number"),
    price: validateProperty<number>(data, "price", "number"),
    stock: validateProperty<number>(data, "stock", "number"),
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
