import { gql } from "@apollo/client";
import { entityPermisoAccionGQL } from "./permisoAccion.interface";

export const allPermisoAccionGQL = gql`
  query Query {
    allPermisoAccion {
      ${entityPermisoAccionGQL}
    }
  }
`;
