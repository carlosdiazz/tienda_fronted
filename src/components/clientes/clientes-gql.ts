import { gql } from "@apollo/client";
import { entityClienterGQL } from "./clientes.interface";

export const allClienteGQL = gql`
  query Query($offset: Int, $limit: Int, $activo: Boolean) {
    allCliente(offset: $offset, limit: $limit, activo: $activo) {
     ${entityClienterGQL}
    }
  }
`;

export const findClienteGQl = gql`
  query FindCliente($findClienteId: Int!) {
  findCliente(id: $findClienteId) {
    ${entityClienterGQL}
  }
}
`;

export const createClienteGQL = gql`
  mutation Mutation($createClienteInput: CreateClienteInput!) {
  createCliente(createClienteInput: $createClienteInput) {
    ${entityClienterGQL}
  }
}
`;

export const updateClienteGQL = gql`
  mutation UpdateCliente($updateClienteInput: UpdateClienteInput!) {
  updateCliente(updateClienteInput: $updateClienteInput) {
    ${entityClienterGQL}
  }
}
`;

export const removeClienteGQL = gql`
  mutation RemoveCliente($removeClienteId: Int!) {
    removeCliente(id: $removeClienteId) {
      error
      message
    }
  }
`;
