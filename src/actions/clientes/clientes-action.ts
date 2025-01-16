"use server";

import {
  allClienteGQL,
  ClienteFormInterface,
  ClienteInterface,
  ClienteMapper,
  createClienteGQL,
  emptyCliente,
  findClienteGQl,
  GetClienteResponse,
  removeClienteGQL,
  updateClienteGQL,
} from "@/components";
import { ResponsePropio } from "@/interface";

import {
  getGraphQLErrorMessage,
  makeClientGraphql,
  ResponsePropioMapper,
} from "@/lib";

export const getClientesAction = async (
  limit: number,
  activo: boolean | null
): Promise<ClienteInterface[]> => {
  //console.info("getClientesAction");
  try {
    const peti = await makeClientGraphql();

    const { data } = await peti.query({
      query: allClienteGQL,
      fetchPolicy: "no-cache",
      variables: {
        limit: limit,
        activo: activo,
      },
    });

    const clientes = GetClienteResponse(data["allCliente"]);
    return clientes;
  } catch (e) {
    console.error(`Error => ${e}`);
    return [];
  }
};

export const getClienteByIdAction = async (
  id: number
): Promise<ClienteInterface | null> => {
  //console.info("getClienteByIdAction");
  if (id === 0) {
    return emptyCliente;
  }
  try {
    const peti = await makeClientGraphql();
    const { data } = await peti.query({
      query: findClienteGQl,
      fetchPolicy: "no-cache",
      variables: {
        findClienteId: id,
      },
    });

    const cliente = ClienteMapper(data["findCliente"]);
    return cliente;
  } catch (e) {
    console.error(`Error => ${e}`);
    return null;
  }
};

const updateClienteByIdAction = async (
  cliente: ClienteFormInterface
): Promise<ResponsePropio> => {
  //console.info("updateClienteByIdAction");
  try {
    const peti = await makeClientGraphql();

    await peti.mutate({
      mutation: updateClienteGQL,
      fetchPolicy: "no-cache",
      variables: {
        updateClienteInput: {
          id: cliente.id,
          activo: cliente.activo,
          documento: cliente.documento,
          name: cliente.name,
          telefono: cliente.telefono,
          tipo_documento: cliente.tipo_documento,
        },
      },
    });

    return {
      error: false,
      message: "Cliente Actualizado",
    };
  } catch (e) {
    console.error(`Error => ${e}`);
    const message = getGraphQLErrorMessage(e);
    return {
      error: true,
      message: `Error actualizando Cliente: ${message}`,
    };
  }
};

const createClienteByIdAction = async (
  cliente: ClienteFormInterface
): Promise<ResponsePropio> => {
  //console.info("createClienteByIdAction");
  try {
    const peti = await makeClientGraphql();
    await peti.mutate({
      mutation: createClienteGQL,
      fetchPolicy: "no-cache",
      variables: {
        createClienteInput: {
          activo: cliente.activo,
          documento: cliente.documento,
          name: cliente.name,
          telefono: cliente.telefono,
          tipo_documento: cliente.tipo_documento,
        },
      },
    });

    return {
      error: false,
      message: "Cliente Creado",
    };
  } catch (e) {
    console.error(`Error => ${e}`);
    const message = getGraphQLErrorMessage(e);
    return {
      error: true,
      message: `Error creando Cliente: ${message}`,
    };
  }
};

export const updateOrCreateClienteByIdAction = async (
  cliente: ClienteFormInterface
): Promise<ResponsePropio> => {
  if (cliente.id === 0) {
    return await createClienteByIdAction(cliente);
  }
  return await updateClienteByIdAction(cliente);
};

export const removeClienteAction = async (
  id: number
): Promise<ResponsePropio> => {
  //console.info("removeClienteAction");
  try {
    const peti = await makeClientGraphql();
    const { data } = await peti.mutate({
      mutation: removeClienteGQL,
      fetchPolicy: "no-cache",
      variables: {
        removeClienteId: id,
      },
    });

    const resp = ResponsePropioMapper(data["removeCliente"]);
    return resp;
  } catch (e) {
    console.error(`Error => ${e}`);
    const message = getGraphQLErrorMessage(e);
    return {
      error: true,
      message: `Error eliminando Cliente: ${message}`,
    };
  }
};
