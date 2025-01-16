"use server";

import {
  allProveedorGQL,
  createProveedorGQL,
  emptyProveedor,
  findProveedorGQl,
  GetProveedorResponse,
  ProveedorFormInterface,
  ProveedorInterface,
  ProveedorMapper,
  removeProveedorGQL,
  updateProveedorGQL,
} from "@/components";
import { ResponsePropio } from "@/interface";
import {
  getGraphQLErrorMessage,
  makeClientGraphql,
  ResponsePropioMapper,
} from "@/lib";

export const getProveedoresAction = async (
  limit: number,
  activo: boolean | null
): Promise<ProveedorInterface[]> => {
  //console.info("getProveedoresAction");
  try {
    const peti = await makeClientGraphql();

    const { data } = await peti.query({
      query: allProveedorGQL,
      fetchPolicy: "no-cache",
      variables: {
        limit: limit,
        activo: activo,
      },
    });

    const proveedores = GetProveedorResponse(data["allProveedor"]);
    return proveedores;
  } catch (e) {
    console.error(`Error => ${e}`);
    return [];
  }
};

export const getProveedorByIdAction = async (
  id: number
): Promise<ProveedorInterface | null> => {
  //console.info("getProveedorByIdAction");
  if (id === 0) {
    return emptyProveedor;
  }
  try {
    const peti = await makeClientGraphql();
    const { data } = await peti.query({
      query: findProveedorGQl,
      fetchPolicy: "no-cache",
      variables: {
        findProveedorId: id,
      },
    });

    const proveedor = ProveedorMapper(data["findProveedor"]);
    return proveedor;
  } catch (e) {
    console.error(`Error => ${e}`);
    return null;
  }
};

const updateProveedorByIdAction = async (
  proveedor: ProveedorFormInterface
): Promise<ResponsePropio> => {
  //console.info("updateProveedorByIdAction");
  try {
    const peti = await makeClientGraphql();

    await peti.mutate({
      mutation: updateProveedorGQL,
      fetchPolicy: "no-cache",
      variables: {
        updateProveedorInput: {
          id: proveedor.id,
          name: proveedor.name,
          descripcion: proveedor.descripcion,
          activo: proveedor.activo,
          direccion: proveedor.direccion,
          telefono: proveedor.telefono,
        },
      },
    });

    return {
      error: false,
      message: "Proveedor Actualizado",
    };
  } catch (e) {
    console.error(`Error => ${e}`);
    const message = getGraphQLErrorMessage(e);
    return {
      error: true,
      message: `Error actualizando Proveedor: ${message}`,
    };
  }
};

const createProveedorByIdAction = async (
  proveedor: ProveedorFormInterface
): Promise<ResponsePropio> => {
  //console.info("createProveedorByIdAction");
  try {
    const peti = await makeClientGraphql();
    await peti.mutate({
      mutation: createProveedorGQL,
      fetchPolicy: "no-cache",
      variables: {
        createProveedorInput: {
          name: proveedor.name,
          descripcion: proveedor.descripcion,
          activo: proveedor.activo,
          direccion: proveedor.direccion,
          telefono: proveedor.telefono,
        },
      },
    });

    return {
      error: false,
      message: "Proveedor Creado",
    };
  } catch (e) {
    console.error(`Error => ${e}`);
    const message = getGraphQLErrorMessage(e);
    return {
      error: true,
      message: `Error creando Proveedor: ${message}`,
    };
  }
};

export const updateOrCreateProveedorByIdAction = async (
  proveedor: ProveedorFormInterface
): Promise<ResponsePropio> => {
  if (proveedor.id === 0) {
    return await createProveedorByIdAction(proveedor);
  }
  return await updateProveedorByIdAction(proveedor);
};

export const removeProveedorAction = async (
  id: number
): Promise<ResponsePropio> => {
  //console.info("removeProveedorAction");
  try {
    const peti = await makeClientGraphql();
    const { data } = await peti.mutate({
      mutation: removeProveedorGQL,
      fetchPolicy: "no-cache",
      variables: {
        removeProveedorId: id,
      },
    });

    const resp = ResponsePropioMapper(data["removeProveedor"]);
    return resp;
  } catch (e) {
    console.error(`Error => ${e}`);
    const message = getGraphQLErrorMessage(e);
    return {
      error: true,
      message: `Error eliminando Proveedor: ${message}`,
    };
  }
};
