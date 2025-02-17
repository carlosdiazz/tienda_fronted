import { create } from "zustand";
import { FacturaInterface } from "./factura.interface";
import { getFacturaAction } from "@/actions";

interface FacturaState {
  factura: FacturaInterface[];
  loading: boolean;
  getFactura: (
    limit: number,
    is_paid: boolean | null,
    id_client: number | null
  ) => Promise<void>;
}

export const useFacturaStore = create<FacturaState>()((set, get) => ({
  factura: [],
  loading: true,
  getFactura: async (limit, is_paid, id_client) => {
    set({ loading: true });

    const factura: FacturaInterface[] = await getFacturaAction(
      limit,
      true,
      is_paid,
      id_client
    );
    set({ loading: false });
    set({ factura });
  },
}));
