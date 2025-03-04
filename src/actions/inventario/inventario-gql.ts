"use server";

import {
  AllIventarioGQL,
  createInventarioGQL,
  GetInventarioResponse,
  InventarioFormInterface,
  InventarioInterface,
} from "@/components";
import { ResponsePropio } from "@/interface";
import { getGraphQLErrorMessage, makeClientGraphql } from "@/lib";

export const getInventarioAction = async (
  limit: number,
  is_ingreso: boolean | null
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
    const { data } = await peti.mutate({
      mutation: createInventarioGQL,
      fetchPolicy: "no-cache",
      variables: {
        createInventarioInput: {
          concepto: inventarioForm.concepto,
          cantidad: inventarioForm.cantidad,
          id_producto: inventarioForm.id_producto,
          id_proveedor: inventarioForm.id_proveedor,
        },
      },
    });

    //const new_Inventario = InventarioMapper(data["createInventario"]);

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
