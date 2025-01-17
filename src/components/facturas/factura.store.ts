import { create } from "zustand";
import { FacturaInterface } from "./factura.interface";
import { getFacturaAction } from "@/actions";

interface FacturaState {
  factura: FacturaInterface[];
  loading: boolean;
  getFactura: (limit: number, activo?: boolean) => Promise<void>;
}

export const useFacturaStore = create<FacturaState>()((set, get) => ({
  factura: [],
  loading: true,
  getFactura: async (limit, activo) => {
    set({ loading: true });
    const new_Activo = activo === undefined ? null : activo;
    const factura: FacturaInterface[] = await getFacturaAction(
      limit,
      new_Activo
    );
    set({ loading: false });
    set({ factura });
  },
}));
