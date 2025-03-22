import { gql } from "@apollo/client";
import { entityUsuarioGQL } from "./usuario.interface";
import { entityRoleGQL } from "../role";
import { entityEmpresaGQL } from "../empleados";

export const allUsuariosGQL = gql`
  query AllUser($limit: Int, $activo: Boolean) {
    allUser(limit: $limit, activo: $activo ) {
      ${entityUsuarioGQL}
      role {
        ${entityRoleGQL}
      }
      empleado {
        ${entityEmpresaGQL}
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
      empleado {
        ${entityEmpresaGQL}
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
