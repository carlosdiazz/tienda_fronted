import { gql } from "@apollo/client";
import { entityInventarioGQL } from "./inventario.interface";
import { entityProductoGQL } from "../productos";
import { entityProveedorGQL } from "../proveedores";

export const AllIventarioGQL = gql`
  query AllInventarios($offset: Int, $limit: Int, $activo: Boolean, $isIngreso: Boolean) {
    allInventarios(offset: $offset, limit: $limit, activo: $activo, is_ingreso: $isIngreso) {
      ${entityInventarioGQL}
      producto{
        ${entityProductoGQL}
      }
      proveedor{
        ${entityProveedorGQL}
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
