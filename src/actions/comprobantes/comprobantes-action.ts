"use server";

import {
  allComprobanteGQL,
  createComprobanteGQL,
  emptyComprobante,
  ComprobanteFormInterface,
  ComprobanteInterface,
  ComprobanteMapper,
  findComprobanteGQl,
  GetComprobanteResponse,
  removeComprobanteGQL,
  updateComprobanteGQL,
} from "@/components";
import { ResponsePropio } from "@/interface";
import {
  getGraphQLErrorMessage,
  makeClientGraphql,
  ResponsePropioMapper,
} from "@/lib";

export const getComprobanteAction = async (
  limit: number,
  activo: boolean | null
): Promise<ComprobanteInterface[]> => {
  //console.info("getComprobanteAction");
  try {
    const peti = await makeClientGraphql();

    const { data } = await peti.query({
      query: allComprobanteGQL,
      fetchPolicy: "no-cache",
      variables: {
        limit: limit,
        activo: activo,
      },
    });

    const Comprobante = GetComprobanteResponse(data["allComprobante"]);
    return Comprobante;
  } catch (e) {
    console.error(`Error => ${e}`);
    return [];
  }
};

export const getComprobanteByIdAction = async (
  id: number
): Promise<ComprobanteInterface | null> => {
  //console.info("getComprobanteByIdAction");
  if (id === 0) {
    return emptyComprobante;
  }
  try {
    const peti = await makeClientGraphql();
    const { data } = await peti.query({
      query: findComprobanteGQl,
      fetchPolicy: "no-cache",
      variables: {
        findComprobanteId: id,
      },
    });

    const Comprobante = ComprobanteMapper(data["findComprobante"]);
    return Comprobante;
  } catch (e) {
    console.error(`Error => ${e}`);
    return null;
  }
};

const updateComprobanteByIdAction = async (
  Comprobante: ComprobanteFormInterface
): Promise<ResponsePropio> => {
  //console.info("updateComprobanteByIdAction");
  try {
    const peti = await makeClientGraphql();

    await peti.mutate({
      mutation: updateComprobanteGQL,
      fetchPolicy: "no-cache",
      variables: {
        updateComprobanteInput: {
          id: Comprobante.id,
          //id_cliente: Comprobante.,
        },
      },
    });

    return {
      error: false,
      message: "Comprobante Actualizada",
    };
  } catch (e) {
    console.error(`Error => ${e}`);
    const message = getGraphQLErrorMessage(e);
    return {
      error: true,
      message: `Error actualizando Comprobante: ${message}`,
    };
  }
};

const createComprobanteByIdAction = async (
  Comprobante: ComprobanteFormInterface
): Promise<ResponsePropio> => {
  //console.info("createComprobanteByIdAction");
  try {
    const peti = await makeClientGraphql();
    await peti.mutate({
      mutation: createComprobanteGQL,
      fetchPolicy: "no-cache",
      variables: {
        createComprobanteInput: {
          concepto: Comprobante.concepto,
          id_factura: Comprobante.id_facura,
          monto_pagado: Comprobante.monto_pagado,
          metodo_pago: Comprobante.metodo_pago,
          referencia_pago: Comprobante.referencia_pago,
        },
      },
    });

    return {
      error: false,
      message: "Comprobante Creada",
    };
  } catch (e) {
    console.error(`Error => ${e}`);
    const message = getGraphQLErrorMessage(e);
    return {
      error: true,
      message: `Error creando Comprobante: ${message}`,
    };
  }
};

export const updateOrCreateComprobanteByIdAction = async (
  Comprobante: ComprobanteFormInterface
): Promise<ResponsePropio> => {
  if (Comprobante.id === 0) {
    return await createComprobanteByIdAction(Comprobante);
  }
  return await updateComprobanteByIdAction(Comprobante);
};

export const removeComprobanteAction = async (
  id: number
): Promise<ResponsePropio> => {
  //console.info("removeComprobanteAction");
  try {
    const peti = await makeClientGraphql();
    const { data } = await peti.mutate({
      mutation: removeComprobanteGQL,
      fetchPolicy: "no-cache",
      variables: {
        removeComprobanteId: id,
      },
    });

    const resp = ResponsePropioMapper(data["removeComprobante"]);
    return resp;
  } catch (e) {
    console.error(`Error => ${e}`);
    const message = getGraphQLErrorMessage(e);
    return {
      error: true,
      message: `Error eliminando Comprobante: ${message}`,
    };
  }
};
