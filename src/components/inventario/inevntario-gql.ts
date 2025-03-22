import { gql } from "@apollo/client";
import { entityInventarioGQL } from "./inventario.interface";
import { entityProductoGQL } from "../productos";
import { entityProveedorGQL } from "../proveedores";

export const AllIventarioGQL = gql`
  query AllInventarios($offset: Int, $limit: Int, $activo: Boolean, $isIngreso: Boolean, $isCredito: Boolean) {
    allInventarios(offset: $offset, limit: $limit, activo: $activo, is_ingreso: $isIngreso, is_credito: $isCredito) {
      ${entityInventarioGQL}
      producto{
        ${entityProductoGQL}
        proveedor{
          ${entityProveedorGQL}
        }
      }
    }
  }
`;

export const createInventarioGQL = gql`
  mutation CreateInventario($createInventarioInput: CreateInventarioInput!) {
    createInventario(createInventarioInput: $createInventarioInput) {
      ${entityInventarioGQL}
  }
}
`;

export const changeStatusInventarioGQL = gql`
  mutation Mutation($changeStatusInventarioId: Int!) {
    changeStatusInventario(id: $changeStatusInventarioId) {
      ${entityInventarioGQL}
    }
  }
`;
