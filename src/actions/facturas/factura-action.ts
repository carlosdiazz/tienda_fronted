"use server";

import {
  allFacturaGQL,
  createFacturaGQL,
  emptyFactura,
  FacturaFormInterface,
  FacturaInterface,
  FacturaMapper,
  findFacturaGQl,
  GetFacturaResponse,
  removeFacturaGQL,
  updateFacturaGQL,
} from "@/components";
import { ResponsePropio } from "@/interface";
import {
  getGraphQLErrorMessage,
  makeClientGraphql,
  ResponsePropioMapper,
} from "@/lib";

export const getFacturaAction = async (
  limit: number,
  activo: boolean | null
): Promise<FacturaInterface[]> => {
  //console.info("getFacturaAction");
  try {
    const peti = await makeClientGraphql();

    const { data } = await peti.query({
      query: allFacturaGQL,
      fetchPolicy: "no-cache",
      variables: {
        limit: limit,
        activo: activo,
      },
    });

    const factura = GetFacturaResponse(data["allFactura"]);
    return factura;
  } catch (e) {
    console.error(`Error => ${e}`);
    return [];
  }
};

export const getFacturaByIdAction = async (
  id: number
): Promise<FacturaInterface | null> => {
  //console.info("getFacturaByIdAction");
  if (id === 0) {
    return emptyFactura;
  }
  try {
    const peti = await makeClientGraphql();
    const { data } = await peti.query({
      query: findFacturaGQl,
      fetchPolicy: "no-cache",
      variables: {
        findFacturaId: id,
      },
    });

    const factura = FacturaMapper(data["findFactura"]);
    return factura;
  } catch (e) {
    console.error(`Error => ${e}`);
    return null;
  }
};

const updateFacturaByIdAction = async (
  factura: FacturaFormInterface
): Promise<ResponsePropio> => {
  //console.info("updateFacturaByIdAction");
  try {
    const peti = await makeClientGraphql();

    await peti.mutate({
      mutation: updateFacturaGQL,
      fetchPolicy: "no-cache",
      variables: {
        updateFacturaInput: {
          id: factura.id,
          //id_cliente: factura.,
        },
      },
    });

    return {
      error: false,
      message: "Factura Actualizada",
    };
  } catch (e) {
    console.error(`Error => ${e}`);
    const message = getGraphQLErrorMessage(e);
    return {
      error: true,
      message: `Error actualizando Factura: ${message}`,
    };
  }
};

const createFacturaByIdAction = async (
  factura: FacturaFormInterface
): Promise<ResponsePropio> => {
  //console.info("createFacturaByIdAction");
  try {
    const peti = await makeClientGraphql();
    await peti.mutate({
      mutation: createFacturaGQL,
      fetchPolicy: "no-cache",
      variables: {
        createFacturaInput: {
          activo: factura.activo,
          //id_cliente: 1,
          is_credito: factura.is_credito,
          total_pagado: factura.total_pagado,
          //productos: { cantidad: 0, id_producto: 0 },
        },
      },
    });

    return {
      error: false,
      message: "Factura Creada",
    };
  } catch (e) {
    console.error(`Error => ${e}`);
    const message = getGraphQLErrorMessage(e);
    return {
      error: true,
      message: `Error creando Factura: ${message}`,
    };
  }
};

export const updateOrCreateFacturaByIdAction = async (
  factura: FacturaFormInterface
): Promise<ResponsePropio> => {
  if (factura.id === 0) {
    return await createFacturaByIdAction(factura);
  }
  return await updateFacturaByIdAction(factura);
};

export const removeFacturaAction = async (
  id: number
): Promise<ResponsePropio> => {
  //console.info("removeFacturaAction");
  try {
    const peti = await makeClientGraphql();
    const { data } = await peti.mutate({
      mutation: removeFacturaGQL,
      fetchPolicy: "no-cache",
      variables: {
        removeFacturaId: id,
      },
    });

    const resp = ResponsePropioMapper(data["removeFactura"]);
    return resp;
  } catch (e) {
    console.error(`Error => ${e}`);
    const message = getGraphQLErrorMessage(e);
    return {
      error: true,
      message: `Error eliminando Factura: ${message}`,
    };
  }
};
