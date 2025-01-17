import { gql } from "@apollo/client";
import { entityComprobanteGQL } from "./comprobante.interface";

export const allComprobanteGQL = gql`
  query AllComprobante($offset: Int, $limit: Int, $activo: Boolean) {
    allComprobante(offset: $offset, limit: $limit, activo: $activo) {
      ${entityComprobanteGQL}
    }
}
`;

export const findComprobanteGQl = gql`
  query FindComprobante($findComprobanteId: Int!) {
    findComprobante(id: $findComprobanteId) {
      ${entityComprobanteGQL}
    }
  }
`;

export const createComprobanteGQL = gql`
  mutation CreateComprobante($createComprobanteInput: CreateComprobanteInput!) {
    createComprobante(createComprobanteInput: $createComprobanteInput) {
      ${entityComprobanteGQL}
    }
}
`;

export const updateComprobanteGQL = gql`
  mutation UpdateComprobante($updateComprobanteInput: UpdateComprobanteInput!) {
    updateComprobante(updateComprobanteInput: $updateComprobanteInput) {
      ${entityComprobanteGQL}
    }
}
`;

export const removeComprobanteGQL = gql`
  mutation RemoveComprobante($removeComprobanteId: Int!) {
    removeComprobante(id: $removeComprobanteId) {
      error
      message
    }
  }
`;
