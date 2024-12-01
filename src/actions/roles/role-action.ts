"use server";

import {
  allRoleGQL,
  createRoleByIdGQL,
  emptyRole,
  findRoleIdGQL,
  GetRolesResponse,
  removeRoleByIdGQL,
  RoleFormInterface,
  RoleInterface,
  RoleMapper,
  updateRoleByIdGQL,
} from "@/components";
import { ResponsePropio } from "@/interface";
import {
  getGraphQLErrorMessage,
  makeClientGraphql,
  ResponsePropioMapper,
} from "@/lib";

export const getRolesAction = async (
  limit: number,
  activo: boolean | null
): Promise<RoleInterface[]> => {
  //console.info("getRolesAction");
  try {
    const peti = await makeClientGraphql();

    const { data } = await peti.query({
      query: allRoleGQL,
      fetchPolicy: "no-cache",
      variables: {
        limit: limit,
        activo: activo,
      },
    });

    const roles = GetRolesResponse(data["allRole"]);
    return roles;
  } catch (e) {
    console.error(`Error => ${e}`);
    return [];
  }
};

export const getRoleByIdAction = async (
  id: number
): Promise<RoleInterface | null> => {
  if (id === 0) {
    return emptyRole;
  }

  try {
    const peti = await makeClientGraphql();

    const { data } = await peti.query({
      query: findRoleIdGQL,
      fetchPolicy: "no-cache",
      variables: {
        findRoleId: id,
      },
    });

    const role: RoleInterface = RoleMapper(data["findRole"]);
    return role;
  } catch (e) {
    console.error(`Error => ${e}`);
    return null;
  }
};

const updateRoleByIdAction = async (
  role: RoleFormInterface
): Promise<ResponsePropio> => {
  //console.info("updateRoleByIdAction");
  try {
    const peti = await makeClientGraphql();

    await peti.mutate({
      mutation: updateRoleByIdGQL,
      fetchPolicy: "no-cache",
      variables: {
        updateRoleInput: {
          activo: role.activo,
          descripcion: role.descripcion,
          id: role.id,
          name: role.name,
          permiso_accion: role.permiso_accion,
        },
      },
    });

    return {
      message: "Rol actualizado",
      error: false,
    };
  } catch (e) {
    console.error(`Error => ${e}`);
    const message = getGraphQLErrorMessage(e);
    return {
      error: true,
      message: `Error actualizando Rol: ${message}`,
    };
  }
};

const createRoleByAction = async (
  role: RoleFormInterface
): Promise<ResponsePropio> => {
  //console.info("createRoleByAction");
  try {
    const peti = await makeClientGraphql();

    await peti.mutate({
      mutation: createRoleByIdGQL,
      fetchPolicy: "no-cache",
      variables: {
        createRoleInput: {
          activo: role.activo,
          descripcion: role.descripcion,
          name: role.name,
          permiso_accion: role.permiso_accion,
        },
      },
    });

    return {
      message: "Rol Creado",
      error: false,
    };
  } catch (e) {
    console.error(`Error => ${e}`);
    const message = getGraphQLErrorMessage(e);
    return {
      error: true,
      message: `Error creando Rol: ${message}`,
    };
  }
};

export const createOrUpdateRoleByIdAction = async (
  role: RoleFormInterface
): Promise<ResponsePropio> => {
  //console.info("createOrUpdateRoleByIdAction");
  if (role.id === 0) {
    return await createRoleByAction(role);
  }
  return await updateRoleByIdAction(role);
};

export const removeRoleAction = async (id: number): Promise<ResponsePropio> => {
  try {
    const peti = await makeClientGraphql();
    const { data } = await peti.mutate({
      mutation: removeRoleByIdGQL,
      fetchPolicy: "no-cache",
      variables: {
        removeRoleId: id,
      },
    });

    const resp = ResponsePropioMapper(data["removeRole"]);
    return resp;
  } catch (e) {
    console.error(`Error => ${e}`);
    const message = getGraphQLErrorMessage(e);
    return {
      error: true,
      message: `Error eliminando Role: ${message}`,
    };
  }
};
