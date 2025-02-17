"use server";

import {
  allEmpresaGQL,
  createEmpresaGQl,
  EmpresaFormInterface,
  EmpresaInterface,
  EmpresaMapper,
  emptyEmpresa,
  findEmpresaGQL,
  GetEmpresasResponse,
  removeEmpresaGQL,
  updateEmpresaGQL,
} from "@/components";
import { ResponsePropio } from "@/interface";
import {
  getGraphQLErrorMessage,
  makeClientGraphql,
  ResponsePropioMapper,
} from "@/lib";

export const getEmpresasAction = async (
  limit: number,
  activo: boolean | null
): Promise<EmpresaInterface[]> => {
  //console.info("getEmpresasAction");
  try {
    const peti = await makeClientGraphql();

    const { data } = await peti.query({
      query: allEmpresaGQL,
      fetchPolicy: "no-cache",
      variables: {
        limit: limit,
        activo: activo,
      },
    });

    const empresas = GetEmpresasResponse(data["allEmpresa"]);
    return empresas;
  } catch (e) {
    console.error(`Error => ${e}`);
    return [];
  }
};

export const getEmpresaByIdAction = async (
  id: number
): Promise<EmpresaInterface | null> => {
  //console.info("getEmpresaByIdAction");
  if (id === 0) {
    return emptyEmpresa;
  }
  try {
    const peti = await makeClientGraphql();
    const { data } = await peti.query({
      query: findEmpresaGQL,
      fetchPolicy: "no-cache",
      variables: {
        findEmpresaId: id,
      },
    });

    const empresa = EmpresaMapper(data["findEmpresa"]);
    return empresa;
  } catch (e) {
    console.error(`Error => ${e}`);
    return null;
  }
};

const updateEmpresaByIdAction = async (
  empresa: EmpresaFormInterface
): Promise<ResponsePropio> => {
  //console.info("updateEmpresaByIdAction");
  try {
    const peti = await makeClientGraphql();

    await peti.mutate({
      mutation: updateEmpresaGQL,
      fetchPolicy: "no-cache",
      variables: {
        updateEmpresaInput: {
          activo: empresa.activo,
          descripcion: empresa.descripcion,
          id: empresa.id,
          name: empresa.name,
          codigo: empresa.codigo,
          cedula: empresa.cedula,
          sueldo: empresa.sueldo,
        },
      },
    });

    return {
      error: false,
      message: "Empleado Actualizado",
    };
  } catch (e) {
    console.error(`Error => ${e}`);
    const message = getGraphQLErrorMessage(e);
    return {
      error: true,
      message: `Error actualizando Empresa: ${message}`,
    };
  }
};

const createEmpresaByIdAction = async (
  empresa: EmpresaFormInterface
): Promise<ResponsePropio> => {
  //console.info("createEmpresaByIdAction");
  try {
    const peti = await makeClientGraphql();
    await peti.mutate({
      mutation: createEmpresaGQl,
      fetchPolicy: "no-cache",
      variables: {
        createEmpresaInput: {
          activo: empresa.activo,
          descripcion: empresa.descripcion,
          name: empresa.name,
          codigo: empresa.codigo,
          cedula: empresa.cedula,
          sueldo: empresa.sueldo,
          fecha: empresa.fecha,
        },
      },
    });

    return {
      error: false,
      message: "Empleado Creado",
    };
  } catch (e) {
    console.error(`Error => ${e}`);
    const message = getGraphQLErrorMessage(e);
    return {
      error: true,
      message: `Error creando Empleado: ${message}`,
    };
  }
};

export const updateOrCreateEmpresaByIdAction = async (
  empresa: EmpresaFormInterface
): Promise<ResponsePropio> => {
  if (empresa.id === 0) {
    return await createEmpresaByIdAction(empresa);
  }
  return await updateEmpresaByIdAction(empresa);
};

export const removeEmpresaAction = async (
  id: number
): Promise<ResponsePropio> => {
  //console.info("removeEmpresaAction");
  try {
    const peti = await makeClientGraphql();
    const { data } = await peti.mutate({
      mutation: removeEmpresaGQL,
      fetchPolicy: "no-cache",
      variables: {
        removeEmpresaId: id,
      },
    });

    const resp = ResponsePropioMapper(data["removeEmpresa"]);
    return resp;
  } catch (e) {
    console.error(`Error => ${e}`);
    const message = getGraphQLErrorMessage(e);
    return {
      error: true,
      message: `Error eliminando Empresa: ${message}`,
    };
  }
};
