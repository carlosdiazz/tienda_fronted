import { create } from "zustand";
import { UsuarioInterface } from "./usuario.interface";
import { getUsuariosAction } from "@/actions";

export interface UsuarioState {
  usuarios: UsuarioInterface[];
  loading: boolean;
  getUsuarios: (limit: number, activo?: boolean) => Promise<void>;
}

export const useUsuariosStore = create<UsuarioState>()((set, get) => ({
  usuarios: [],
  loading: true,

  getUsuarios: async (limit, activo) => {
    set({ loading: true });
    const new_Activo = activo === undefined ? null : activo;

    const usuarios: UsuarioInterface[] = await getUsuariosAction(
      limit,
      new_Activo
    );
    set({ loading: false });
    set({ usuarios });
  },
}));
