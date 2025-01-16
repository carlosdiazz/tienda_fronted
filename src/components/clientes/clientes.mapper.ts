import { validateProperty } from "@/lib";
import { ClienteInterface } from "./clientes.interface";

export const ClienteMapper = (data: any): ClienteInterface => {
  return {
    id: validateProperty<number>(data, "id", "number"),
    name: validateProperty<string>(data, "name", "string"),
    activo: validateProperty<boolean>(data, "activo", "boolean"),
    telefono: validateProperty<string>(data, "telefono", "string"),
    documento: validateProperty<string>(data, "documento", "string"),
    tipo_documento: validateProperty<string>(data, "tipo_documento", "string"),
  };
};

export const GetClienteResponse = (data: any): ClienteInterface[] => {
  const clientes: ClienteInterface[] = [];
  for (const key of data) {
    const cliente = ClienteMapper(key);
    clientes.push(cliente);
  }
  return clientes;
};
