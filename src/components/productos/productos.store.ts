import { create } from "zustand";
import { ProductoInterface } from "./producto.interface";
import { getProductosAction } from "@/actions";

interface ProductosState {
  productos: ProductoInterface[];
  loading: boolean;
  getProductos: (limit: number, activo?: boolean) => Promise<void>;
}

export const useProductosStore = create<ProductosState>()((set, get) => ({
  productos: [],
  loading: true,
  getProductos: async (limit, activo) => {
    set({ loading: true });
    const new_Activo = activo === undefined ? null : activo;
    const productos: ProductoInterface[] = await getProductosAction(
      limit,
      new_Activo
    );
    set({ loading: false });
    set({ productos });
  },
}));
