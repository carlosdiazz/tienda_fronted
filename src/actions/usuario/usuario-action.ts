"use server";

import {
  allUsuariosGQL,
  createUserGQL,
  emptyUsuario,
  findUserGQL,
  GetUsuariosResponse,
  updateUserGQL,
  UsuarioFormInterface,
  UsuarioInterface,
  UsuarioMapper,
} from "@/components";
import { ResponsePropio } from "@/interface";
import { getGraphQLErrorMessage, makeClientGraphql } from "@/lib";

export const getUsuariosAction = async (
  limit: number,
  activo: boolean | null
): Promise<UsuarioInterface[]> => {
  //console.info("getUsuariosAction");
  try {
    const peti = await makeClientGraphql();
    const { data } = await peti.query({
      query: allUsuariosGQL,
      variables: {
        limit: limit,
        activo: activo,
      },
    });

    const usuarios: UsuarioInterface[] = GetUsuariosResponse(data["allUser"]);
    return usuarios;
  } catch (e) {
    console.error(`Errro => ${e}`);
    return [];
  }
};

export const getUsuarioByIdAction = async (
  id: number
): Promise<UsuarioInterface | null> => {
  //console.info("getUsuarioByIdAction");
  if (id === 0) {
    return emptyUsuario;
  }

  try {
    const peti = await makeClientGraphql();
    const { data } = await peti.query({
      query: findUserGQL,
      variables: {
        findUserId: id,
      },
    });
    const usuario: UsuarioInterface = UsuarioMapper(data["findUser"]);
    return usuario;
  } catch (e) {
    //console.info(`Error => ${e}`);
    return null;
  }
};

const updateUsuarioAction = async (
  usuario: UsuarioFormInterface
): Promise<ResponsePropio> => {
  //console.info("updateUsuarioAction");
  try {
    const peti = await makeClientGraphql();

    await peti.mutate({
      mutation: updateUserGQL,
      fetchPolicy: "no-cache",
      variables: {
        updateUserInput: {
          activo: usuario.activo,
          email: usuario.email,
          id: usuario.id,
          name: usuario.name,
          nickname: usuario.nickname,
          role: usuario.roles,
          password: usuario.password,
        },
      },
    });

    return {
      error: false,
      message: "Usuario Actualizada",
    };
  } catch (e) {
    console.error(`Error => ${e}`);
    const message = getGraphQLErrorMessage(e);
    return {
      error: true,
      message: `Error actualizando Usuario: ${message}`,
    };
  }
};

const createUsuarioAction = async (
  usuario: UsuarioFormInterface
): Promise<ResponsePropio> => {
  //console.info("createUsuarioAction");
  try {
    const peti = await makeClientGraphql();

    await peti.mutate({
      mutation: createUserGQL,
      fetchPolicy: "no-cache",
      variables: {
        signupInput: {
          activo: usuario.activo,
          email: usuario.email,
          name: usuario.name,
          nickname: usuario.nickname,
          password: usuario.password,
          role: usuario.roles,
        },
      },
    });

    return {
      error: false,
      message: "Usuario Creado",
    };
  } catch (e) {
    console.error(`Error => ${e}`);
    const message = getGraphQLErrorMessage(e);
    return {
      error: true,
      message: `Error creando usuario: ${message}`,
    };
  }
};

export const createOrUpdateUsuarioByIdAction = async (
  usuario: UsuarioFormInterface
): Promise<ResponsePropio> => {
  //console.info("createOrUpdateUsuarioByIdAction");
  if (usuario.id === 0) {
    return await createUsuarioAction(usuario);
  }
  return await updateUsuarioAction(usuario);
};
