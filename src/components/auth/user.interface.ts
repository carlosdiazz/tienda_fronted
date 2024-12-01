export interface UserInterface {
  id: number;
  email: string;
  nickname: string;
  name: string;
  activo: string;
  token: string;
  permisos: string[];
}

export interface AuthInterface {
  user: UserInterface;
}

interface PermisoAccion {
  id: number;
  action: string;
  method: string;
  entity: string;
  activo: boolean;
}

interface Role {
  id: number;
  name: string;
  descripcion: string;
  activo: boolean;
  permiso_accion: PermisoAccion[];
}

const permisosArr = (data: Role[]): string[] => {
  const rolesSet = new Set<string>();

  data.forEach((role) => {
    role.permiso_accion.forEach((permiso) => {
      rolesSet.add(permiso.action);
    });
  });

  return Array.from(rolesSet);
};

export const UserMapper = (data: any): UserInterface => {
  if (typeof data.id !== "number") {
    throw new Error("Invalid property id");
  }

  if (typeof data.email !== "string") {
    throw new Error("Invalid property email");
  }

  if (typeof data.nickname !== "string") {
    throw new Error("Invalid property nickname");
  }

  if (typeof data.name !== "string") {
    throw new Error("Invalid property name");
  }

  if (typeof data.activo !== "boolean") {
    throw new Error("Invalid property activo");
  }

  if (typeof data.token !== "string") {
    throw new Error("Invalid property token");
  }

  if (!Array.isArray(data.role)) {
    throw new Error("Invalid property role");
  }

  const arreglo = permisosArr(data.role);

  const auth: UserInterface = {
    token: data.token,
    id: data.id,
    email: data.email,
    nickname: data.nickname,
    name: data.name,
    activo: data.activo,
    permisos: arreglo,
  };
  return auth;
};
