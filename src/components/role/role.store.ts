import { create } from "zustand";
import { RoleInterface } from "./role.interface";
import { getRolesAction } from "@/actions";

export interface RolesState {
  roles: RoleInterface[];
  loading: boolean;
  getRoles: (limit: number, activo?: boolean) => Promise<void>;
}

export const useRoleStore = create<RolesState>()((set, get) => ({
  roles: [],
  loading: true,

  getRoles: async (limit, activo) => {
    set({ loading: true });
    const new_Activo = activo === undefined ? null : activo;
    const roles: RoleInterface[] = await getRolesAction(limit, new_Activo);
    set({ loading: false });
    set({ roles });
  },
}));
