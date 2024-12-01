import { gql } from "@apollo/client";
import { entityRoleGQL } from "./role.interface";

export const allRoleGQL = gql`
  query AllRole($limit: Int, $activo: Boolean ) {
    allRole(limit: $limit, activo: $activo) {
      ${entityRoleGQL}
    }
  }
`;

export const findRoleIdGQL = gql`
  query FindRole($findRoleId: Int!) {
    findRole(id: $findRoleId) {
      ${entityRoleGQL}
    }
  }
`;

export const updateRoleByIdGQL = gql`
  mutation UpdateRole($updateRoleInput: UpdateRoleInput!) {
    updateRole(updateRoleInput: $updateRoleInput) {
      ${entityRoleGQL}
    }
  }
`;

export const createRoleByIdGQL = gql`
  mutation CreateRol($createRoleInput: CreateRoleInput!) {
    createRol(createRoleInput: $createRoleInput) {
      ${entityRoleGQL}
    }
  }
`;

export const removeRoleByIdGQL = gql`
  mutation Mutation($removeRoleId: Int!) {
    removeRole(id: $removeRoleId) {
      error
      message
    }
  }
`;
