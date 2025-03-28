import { create } from "zustand";
import { InventarioInterface } from "./inventario.interface";
import { getInventarioAction } from "@/actions";

interface InventarioState {
  inventarios: InventarioInterface[];
  loading: boolean;
  getInventarios: (
    limit: number,
    is_ingreso?: boolean,
    is_Credito?: boolean
  ) => Promise<void>;
}

export const useInventarioStore = create<InventarioState>()((set, get) => ({
  inventarios: [],
  loading: true,
  getInventarios: async (limit, is_ingreso, is_credito) => {
    set({ loading: true });
    const new_is_ingreso = is_ingreso === undefined ? null : is_ingreso;
    const new_is_credito = is_credito === undefined ? null : is_credito;

    const inventarios: InventarioInterface[] = await getInventarioAction(
      limit,
      new_is_ingreso,
      new_is_credito
    );
    set({ loading: false });
    set({ inventarios });
  },
}));
