import { gql } from "@apollo/client";
import { entityFacturaGQL } from "./factura.interface";

export const allFacturaGQL = gql`
  query AllFactura($offset: Int, $limit: Int, $activo: Boolean) {
    allFactura(offset: $offset, limit: $limit, activo: $activo) {
      ${entityFacturaGQL}
    }
  }
`;

export const findFacturaGQl = gql`
  query FindFactura($findFacturaId: Int!) {
  findFactura(id: $findFacturaId) {
    ${entityFacturaGQL}
  }
}
`;

export const createFacturaGQL = gql`
  mutation Mutation($createFacturaInput: CreateFacturaInput!) {
  createFactura(createFacturaInput: $createFacturaInput) {
    ${entityFacturaGQL}
  }
}
`;

export const updateFacturaGQL = gql`
  mutation UpdateFactura($updateFacturaInput: UpdateFacturaInput!) {
  updateFactura(updateFacturaInput: $updateFacturaInput) {
    ${entityFacturaGQL}
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
