import { gql } from "@apollo/client";
import { entityUsuarioGQL } from "./usuario.interface";
import { entityRoleGQL } from "../role";

export const allUsuariosGQL = gql`
  query AllUser($limit: Int, $activo: Boolean) {
    allUser(limit: $limit, activo: $activo ) {
      ${entityUsuarioGQL}
      role {
        ${entityRoleGQL}
      }
    }
  }
`;

export const findUserGQL = gql`
  query FindUser($findUserId: ID!) {
    findUser(id: $findUserId) {
      ${entityUsuarioGQL}
      role {
        ${entityRoleGQL}
      }
    }
  }
`;

export const updateUserGQL = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      ${entityUsuarioGQL}
    }
  }
`;

export const createUserGQL = gql`
  mutation Mutation($signupInput: SignupInput!) {
    signup(signupInput: $signupInput) {
      token
    }
  }
`;
