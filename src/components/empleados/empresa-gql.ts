import { gql } from "@apollo/client";
import { entityEmpresaGQL } from "./empresa.interface";

export const allEmpresaGQL = gql`
  query AllEmpresa($activo: Boolean, $limit: Int, $offset: Int) {
    allEmpresa(activo: $activo, limit: $limit, offset: $offset) {
      ${entityEmpresaGQL}
    }
  }
`;

export const findEmpresaGQL = gql`
  query FindEmpresa($findEmpresaId: Int!) {
    findEmpresa(id: $findEmpresaId) {
      ${entityEmpresaGQL}
    }
  }
`;

export const updateEmpresaGQL = gql`
  mutation UpdateEmpresa($updateEmpresaInput: UpdateEmpresaInput!) {
    updateEmpresa(updateEmpresaInput: $updateEmpresaInput) {
      ${entityEmpresaGQL}
    }
  }
`;

export const createEmpresaGQl = gql`
  mutation CreateEmpresa($createEmpresaInput: CreateEmpresaInput!) {
    createEmpresa(createEmpresaInput: $createEmpresaInput) {
      ${entityEmpresaGQL}
    }
  }
`;

export const removeEmpresaGQL = gql`
  mutation RemoveEmpresa($removeEmpresaId: Int!) {
    removeEmpresa(id: $removeEmpresaId) {
      message
      error
    }
  }
`;
