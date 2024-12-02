import { gql } from "@apollo/client";
import { entityProductoGQL } from "./producto.interface";

export const allProductosGQL = gql`
  query AllProductos($offset: Int, $limit: Int, $activo: Boolean) {
    allProductos(offset: $offset, limit: $limit, activo: $activo) {
      ${entityProductoGQL}
    }
  }
`;

export const findProductoGQL = gql`
  query FindProducto($findProductoId: Int!) {
    findProducto(id: $findProductoId) {
      ${entityProductoGQL}
    }
  }
`;

export const updateProductoGQL = gql`
  mutation UpdateProducto($updateProductoInput: UpdateProductoInput!) {
    updateProducto(updateProductoInput: $updateProductoInput) {
      ${entityProductoGQL}
    }
  }
`;

export const createProductoGQL = gql`
  mutation CreateProducto($createProductoInput: CreateProductoInput!) {
    createProducto(createProductoInput: $createProductoInput) {
      ${entityProductoGQL}
    }
  }
`;

export const removeProductoGQL = gql`
  mutation RemoveProducto($removeProductoId: Int!) {
    removeProducto(id: $removeProductoId) {
      error
      message
    }
  }
`;
