import { validateProperty } from "@/lib";
import { ProveedorInterface } from "./proveedor.interface";

export const ProveedorMapper = (data: any): ProveedorInterface => {
  return {
    id: validateProperty<number>(data, "id", "number"),
    name: validateProperty<string>(data, "name", "string"),
    descripcion: validateProperty<string>(data, "descripcion", "string"),
    activo: validateProperty<boolean>(data, "activo", "boolean"),
    direccion: validateProperty<string>(data, "direccion", "string"),
    telefono: validateProperty<string>(data, "telefono", "string"),
  };
};

export const GetProveedorResponse = (data: any): ProveedorInterface[] => {
  const proveedors: ProveedorInterface[] = [];
  for (const key of data) {
    const proveedor = ProveedorMapper(key);
    proveedors.push(proveedor);
  }
  return proveedors;
};
