import { gql } from "@apollo/client";
import { entityRelacionesFacturaGQL } from "./factura.interface";

export const allFacturaGQL = gql`
  query AllFactura($offset: Int, $limit: Int, $activo: Boolean) {
    allFactura(offset: $offset, limit: $limit, activo: $activo) {
      ${entityRelacionesFacturaGQL}
    }
  }
`;

export const findFacturaGQl = gql`
  query FindFactura($findFacturaId: Int!) {
  findFactura(id: $findFacturaId) {
    ${entityRelacionesFacturaGQL}
  }
}
`;

export const createFacturaGQL = gql`
  mutation Mutation($createFacturaInput: CreateFacturaInput!) {
  createFactura(createFacturaInput: $createFacturaInput) {
    ${entityRelacionesFacturaGQL}
  }
}
`;

export const updateFacturaGQL = gql`
  mutation UpdateFactura($updateFacturaInput: UpdateFacturaInput!) {
  updateFactura(updateFacturaInput: $updateFacturaInput) {
    ${entityRelacionesFacturaGQL}
  }
}
`;

export const removeFacturaGQL = gql`
  mutation RemoveFactura($removeFacturaId: Int!) {
    removeFactura(id: $removeFacturaId) {
      error
      message
    }
  }
`;
