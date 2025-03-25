import { create } from "zustand";
import { ProductoInterface } from "./producto.interface";
import { getProductosAction } from "@/actions";

interface ProductosState {
  productos: ProductoInterface[];
  loading: boolean;
  getProductos: (
    limit: number,
    activo?: boolean,
    is_service?: boolean,
    id_proveedor?: number
  ) => Promise<void>;
}

export const useProductosStore = create<ProductosState>()((set, get) => ({
  productos: [],
  loading: true,
  getProductos: async (limit, activo, is_service, id_proveedor) => {
    set({ loading: true });
    const new_Activo = activo === undefined ? null : activo;
    const news_is_service = is_service === undefined ? null : is_service;
    const news_id_proveedor = id_proveedor === undefined ? null : id_proveedor;

    const productos: ProductoInterface[] = await getProductosAction(
      limit,
      new_Activo,
      news_is_service,
      news_id_proveedor
    );
    set({ loading: false });
    set({ productos });
  },
}));
