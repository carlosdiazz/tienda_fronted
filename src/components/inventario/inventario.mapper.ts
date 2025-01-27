import { validateProperty } from "@/lib";
import { InventarioInterface } from "./inventario.interface";
import { ProductoMapper } from "../productos";

export const InventarioMapper = (data: any): InventarioInterface => {
  return {
    id: validateProperty<number>(data, "id", "number"),
    cantidad: validateProperty<number>(data, "cantidad", "number"),
    is_ingreso: validateProperty<boolean>(data, "is_ingreso", "boolean"),
    concepto: validateProperty<string>(data, "concepto", "string"),
    producto: data["producto"] ? ProductoMapper(data["producto"]) : null,
  };
};

export const GetInventarioResponse = (data: any): InventarioInterface[] => {
  const inventarios: InventarioInterface[] = [];
  for (const key of data) {
    const inventario = InventarioMapper(key);
    inventarios.push(inventario);
  }

  return inventarios;
};
