import { gql } from "@apollo/client";
import { entityProveedorGQL } from "./proveedor.interface";

export const allProveedorGQL = gql`
  query AllProveedor($offset: Int, $limit: Int, $activo: Boolean) {
    allProveedor(offset: $offset, limit: $limit, activo: $activo) {
      ${entityProveedorGQL}
    }
  }
`;

export const findProveedorGQl = gql`
  query FindProveedor($findProveedorId: Int!) {
    findProveedor(id: $findProveedorId) {
      ${entityProveedorGQL}
    }
  }
`;

export const createProveedorGQL = gql`
  mutation CreateProveedor($createProveedorInput: CreateProveedorInput!) {
    createProveedor(createProveedorInput: $createProveedorInput) {
      ${entityProveedorGQL}
    }
  }
`;

export const updateProveedorGQL = gql`
  mutation Mutation($updateProveedorInput: UpdateProveedorInput!) {
    updateProveedor(updateProveedorInput: $updateProveedorInput) {
      ${entityProveedorGQL}
    }
  }
`;

export const removeProveedorGQL = gql`
  mutation RemoveProveedor($removeProveedorId: Int!) {
    removeProveedor(id: $removeProveedorId) {
      error
      message
    }
  }
`;
