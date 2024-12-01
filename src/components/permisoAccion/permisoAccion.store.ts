import { create } from "zustand";
import { PermisoAccionInterface } from "./permisoAccion.interface";
import { getPermisosAccionAction } from "@/actions";

interface PermisoAccionState {
  permisos: PermisoAccionInterface[];
  loading: boolean;
  getPermisos: () => Promise<void>;
}

export const usePermisoAccionStore = create<PermisoAccionState>()(
  (set, get) => ({
    permisos: [],
    loading: true,

    getPermisos: async () => {
      set({ loading: true });
      const permisos: PermisoAccionInterface[] =
        await getPermisosAccionAction();
      set({ loading: false });
      set({ permisos });
    },
  })
);
