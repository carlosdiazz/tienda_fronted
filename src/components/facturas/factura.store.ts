import { create } from "zustand";
import { FacturaInterface } from "./factura.interface";
import { getFacturaAction } from "@/actions";

interface FacturaState {
  factura: FacturaInterface[];
  loading: boolean;
  getFactura: (
    limit: number,
    is_paid: boolean | null,
    id_client: number | null,
    activo?: boolean,
    id_user?: number
  ) => Promise<void>;
}

export const useFacturaStore = create<FacturaState>()((set, get) => ({
  factura: [],
  loading: true,
  getFactura: async (limit, is_paid, id_client, activo, id_user) => {
    set({ loading: true });

    const new_Activo = activo === undefined ? null : activo;
    const new_id_user = id_user === undefined ? null : id_user;

    const factura: FacturaInterface[] = await getFacturaAction(
      limit,
      new_Activo,
      is_paid,
      id_client,
      new_id_user
    );
    set({ loading: false });
    set({ factura });
  },
}));
