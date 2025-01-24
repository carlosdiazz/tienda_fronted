"use server";

import {
  allProductosGQL,
  createProductoGQL,
  emptyProducto,
  findProductoGQL,
  GetProductosResponse,
  ProductoFormInterface,
  ProductoInterface,
  ProductoMapper,
  removeProductoGQL,
  updateProductoGQL,
} from "@/components";
import { ResponsePropio } from "@/interface";
import {
  getGraphQLErrorMessage,
  makeClientGraphql,
  ResponsePropioMapper,
} from "@/lib";

export const getProductosAction = async (
  limit: number,
  activo: boolean | null
): Promise<ProductoInterface[]> => {
  //console.info("getProductosAction");
  try {
    const peti = await makeClientGraphql();

    const { data } = await peti.query({
      query: allProductosGQL,
      fetchPolicy: "no-cache",
      variables: {
        limit: limit,
        activo: activo,
      },
    });

    const productos = GetProductosResponse(data["allProductos"]);
    return productos;
  } catch (e) {
    console.error(`Error => ${e}`);
    return [];
  }
};

export const getProductoByIdAction = async (
  id: number
): Promise<ProductoInterface | null> => {
  //console.info("getProductoByIdAction");
  if (id === 0) {
    return emptyProducto;
  }
  try {
    const peti = await makeClientGraphql();
    const { data } = await peti.query({
      query: findProductoGQL,
      fetchPolicy: "no-cache",
      variables: {
        findProductoId: id,
      },
    });

    const producto = ProductoMapper(data["findProducto"]);
    return producto;
  } catch (e) {
    console.error(`Error => ${e}`);
    return null;
  }
};

const updateProductoByIdAction = async (
  producto: ProductoFormInterface
): Promise<ResponsePropio> => {
  //console.info("updateProductoByIdAction");
  try {
    const peti = await makeClientGraphql();

    await peti.mutate({
      mutation: updateProductoGQL,
      fetchPolicy: "no-cache",
      variables: {
        updateProductoInput: {
          activo: producto.activo,
          descripcion: producto.descripcion,
          id: producto.id,
          name: producto.name,
          codigo: producto.codigo,
          price: producto.price,
          stock: producto.stock,
          stock_minimo: producto.stock_minimo,
          is_service: producto.is_service,
        },
      },
    });

    return {
      error: false,
      message: "Producto Actualizado",
    };
  } catch (e) {
    console.error(`Error => ${e}`);
    const message = getGraphQLErrorMessage(e);
    return {
      error: true,
      message: `Error actualizando Producto: ${message}`,
    };
  }
};

const createProductoByIdAction = async (
  producto: ProductoFormInterface
): Promise<ResponsePropio> => {
  //console.info("createProductoByIdAction");
  try {
    const peti = await makeClientGraphql();
    await peti.mutate({
      mutation: createProductoGQL,
      fetchPolicy: "no-cache",
      variables: {
        createProductoInput: {
          activo: producto.activo,
          descripcion: producto.descripcion,
          name: producto.name,
          codigo: producto.codigo,
          price: producto.price,
          stock: producto.stock,
          stock_minimo: producto.stock_minimo,
          is_service: producto.is_service,
        },
      },
    });

    return {
      error: false,
      message: "Producto Creado",
    };
  } catch (e) {
    console.error(`Error => ${e}`);
    const message = getGraphQLErrorMessage(e);
    return {
      error: true,
      message: `Error creando Producto: ${message}`,
    };
  }
};

export const updateOrCreateProductoByIdAction = async (
  producto: ProductoFormInterface
): Promise<ResponsePropio> => {
  if (producto.id === 0) {
    return await createProductoByIdAction(producto);
  }
  return await updateProductoByIdAction(producto);
};

export const removeProductoAction = async (
  id: number
): Promise<ResponsePropio> => {
  //console.info("removeProductoAction");
  try {
    const peti = await makeClientGraphql();
    const { data } = await peti.mutate({
      mutation: removeProductoGQL,
      fetchPolicy: "no-cache",
      variables: {
        removeProductoId: id,
      },
    });

    const resp = ResponsePropioMapper(data["removeProducto"]);
    return resp;
  } catch (e) {
    console.error(`Error => ${e}`);
    const message = getGraphQLErrorMessage(e);
    return {
      error: true,
      message: `Error eliminando Producto: ${message}`,
    };
  }
};
