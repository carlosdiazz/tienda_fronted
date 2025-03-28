"use server";

import {
  AllIventarioGQL,
  changeStatusInventarioGQL,
  createInventarioGQL,
  GetInventarioResponse,
  InventarioFormInterface,
  InventarioInterface,
} from "@/components";
import { ResponsePropio } from "@/interface";
import { getGraphQLErrorMessage, makeClientGraphql } from "@/lib";

export const getInventarioAction = async (
  limit: number,
  is_ingreso: boolean | null,
  is_credito: boolean | null
): Promise<InventarioInterface[]> => {
  //console.info("getInventarioAction");
  try {
    const peti = await makeClientGraphql();

    const { data } = await peti.query({
      query: AllIventarioGQL,
      fetchPolicy: "no-cache",
      variables: {
        limit: limit,
        isIngreso: is_ingreso,
        isCredito: is_credito,
      },
    });

    const inventarios = GetInventarioResponse(data["allInventarios"]);
    return inventarios;
  } catch (e) {
    console.error(`Error => ${e}`);
    return [];
  }
};

export const createInventarioAction = async (
  inventarioForm: InventarioFormInterface
): Promise<ResponsePropio> => {
  //console.info("createInventarioAction");
  try {
    const peti = await makeClientGraphql();
    await peti.mutate({
      mutation: createInventarioGQL,
      fetchPolicy: "no-cache",
      variables: {
        createInventarioInput: {
          concepto: inventarioForm.concepto,
          cantidad: inventarioForm.cantidad,
          id_producto: inventarioForm.id_producto,
          is_credito: inventarioForm.is_credito,
        },
      },
    });

    return {
      error: false,
      message: "Inventario Creado",
    };
  } catch (e) {
    console.error(`Error => ${e}`);
    const message = getGraphQLErrorMessage(e);
    return {
      error: true,
      message: `Error creando Inventario: ${message}`,
    };
  }
};

export const changeStatusInventario = async (
  id: number
): Promise<ResponsePropio> => {
  try {
    const peti = await makeClientGraphql();
    await peti.mutate({
      mutation: changeStatusInventarioGQL,
      fetchPolicy: "no-cache",
      variables: {
        changeStatusInventarioId: id,
      },
    });

    return {
      error: false,
      message: `Ok!`,
    };
  } catch (e) {
    console.error(`Error => ${e}`);
    const message = getGraphQLErrorMessage(e);
    return {
      error: true,
      message: `Error: ${message}`,
    };
  }
};
