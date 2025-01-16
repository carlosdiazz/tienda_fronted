import { create } from "zustand";
import { ProveedorInterface } from "./proveedor.interface";
import { getProveedoresAction } from "@/actions";

interface ProveedorState {
  proveedores: ProveedorInterface[];
  loading: boolean;
  getProveedores: (limit: number, activo?: boolean) => Promise<void>;
}

export const useProveedorStore = create<ProveedorState>()((set, get) => ({
  proveedores: [],
  loading: true,
  getProveedores: async (limit, activo) => {
    set({ loading: true });
    const new_Activo = activo === undefined ? null : activo;
    const proveedores: ProveedorInterface[] = await getProveedoresAction(
      limit,
      new_Activo
    );
    set({ loading: false });
    set({ proveedores });
  },
}));
