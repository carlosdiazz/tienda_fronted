import { validateProperty } from "@/lib";
import { EmpresaInterface } from "./empresa.interface";

export const EmpresaMapper = (data: any): EmpresaInterface => {
  return {
    id: validateProperty<number>(data, "id", "number"),
    name: validateProperty<string>(data, "name", "string"),
    descripcion: validateProperty<string>(data, "descripcion", "string"),
    activo: validateProperty<boolean>(data, "activo", "boolean"),
    codigo: validateProperty<number>(data, "codigo", "number"),
    cedula: validateProperty<string>(data, "cedula", "string"),
  };
};

export const GetEmpresasResponse = (data: any): EmpresaInterface[] => {
  const empresas: EmpresaInterface[] = [];
  for (const key of data) {
    const empresa = EmpresaMapper(key);
    empresas.push(empresa);
  }
  return empresas;
};
