"use server";

import {
  allPermisoAccionGQL,
  GetPermisoAccionResponse,
  PermisoAccionInterface,
} from "@/components";
import { makeClientGraphql } from "@/lib";

export const getPermisosAccionAction = async (): Promise<
  PermisoAccionInterface[]
> => {
  //console.info("getPermisosAccionAction");
  try {
    const peti = await makeClientGraphql();

    const { data } = await peti.query({
      query: allPermisoAccionGQL,
      fetchPolicy: "no-cache",
    });
    const permisos = GetPermisoAccionResponse(data["allPermisoAccion"]);
    return permisos;
  } catch (e) {
    console.error(`Error => ${e}`);
    return [];
  }
};
