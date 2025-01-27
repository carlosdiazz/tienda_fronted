import { create } from "zustand";
import { InventarioInterface } from "./inventario.interface";
import { getInventarioAction } from "@/actions";

interface InventarioState {
  inventarios: InventarioInterface[];
  loading: boolean;
  getInventarios: (limit: number, is_ingreso?: boolean) => Promise<void>;
}

export const useInventarioStore = create<InventarioState>()((set, get) => ({
  inventarios: [],
  loading: true,
  getInventarios: async (limit, is_ingreso) => {
    set({ loading: true });
    const new_is_ingreso = is_ingreso === undefined ? null : is_ingreso;
    const inventarios: InventarioInterface[] = await getInventarioAction(
      limit,
      new_is_ingreso
    );
    set({ loading: false });
    set({ inventarios });
  },
}));
