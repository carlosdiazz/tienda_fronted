import { create } from "zustand";
import { ComprobanteInterface } from "./comprobante.interface";
import { getComprobanteAction } from "@/actions";

interface ComprobanteState {
  Comprobante: ComprobanteInterface[];
  loading: boolean;
  getComprobante: (limit: number, activo?: boolean) => Promise<void>;
}

export const useComprobanteStore = create<ComprobanteState>()((set, get) => ({
  Comprobante: [],
  loading: true,
  getComprobante: async (limit, activo) => {
    set({ loading: true });
    const new_Activo = activo === undefined ? null : activo;
    const Comprobante: ComprobanteInterface[] = await getComprobanteAction(
      limit,
      new_Activo
    );
    set({ loading: false });
    set({ Comprobante });
  },
}));
