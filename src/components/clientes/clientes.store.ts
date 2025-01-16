import { create } from "zustand";
import { ClienteInterface } from "./clientes.interface";
import { getClientesAction } from "@/actions";

interface ClienteState {
  clientes: ClienteInterface[];
  loading: boolean;
  getClientes: (limit: number, activo?: boolean) => Promise<void>;
}

export const useCLienteStore = create<ClienteState>()((set, get) => ({
  clientes: [],
  loading: true,
  getClientes: async (limit, activo) => {
    set({ loading: true });
    const new_Activo = activo === undefined ? null : activo;
    const clientes: ClienteInterface[] = await getClientesAction(
      limit,
      new_Activo
    );
    set({ loading: false });
    set({ clientes });
  },
}));
