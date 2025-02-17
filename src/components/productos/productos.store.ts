import { create } from "zustand";
import { ProductoInterface } from "./producto.interface";
import { getProductosAction } from "@/actions";

interface ProductosState {
  productos: ProductoInterface[];
  loading: boolean;
  getProductos: (
    limit: number,
    activo?: boolean,
    is_service?: boolean
  ) => Promise<void>;
}

export const useProductosStore = create<ProductosState>()((set, get) => ({
  productos: [],
  loading: true,
  getProductos: async (limit, activo, is_service) => {
    set({ loading: true });
    const new_Activo = activo === undefined ? null : activo;
    const news_is_service = is_service === undefined ? null : is_service;
    const productos: ProductoInterface[] = await getProductosAction(
      limit,
      new_Activo,
      news_is_service
    );
    set({ loading: false });
    set({ productos });
  },
}));
