import { create } from "zustand";
import { ProductoInterface } from "./producto.interface";
import { getProductosAction } from "@/actions";

interface ProductosState {
  productos: ProductoInterface[];
  productos_stock_bajo: ProductoInterface[];
  get_productos_stock_bajo: () => Promise<void>;
  loading: boolean;
  getProductos: (
    limit: number,
    activo?: boolean,
    is_service?: boolean,
    id_proveedor?: number,
    isStockMinimo?: string
  ) => Promise<void>;
}

export const useProductosStore = create<ProductosState>()((set, get) => ({
  productos: [],
  productos_stock_bajo: [],
  loading: true,
  getProductos: async (
    limit,
    activo,
    is_service,
    id_proveedor,
    isStockMinimo
  ) => {
    set({ loading: true });
    const new_Activo = activo === undefined ? null : activo;
    const news_is_service = is_service === undefined ? null : is_service;
    const news_id_proveedor = id_proveedor === undefined ? null : id_proveedor;
    const new_isStockMinimo =
      isStockMinimo === "true"
        ? true
        : isStockMinimo === "false"
        ? false
        : null;

    const productos: ProductoInterface[] = await getProductosAction(
      limit,
      new_Activo,
      news_is_service,
      news_id_proveedor,
      new_isStockMinimo
    );
    set({ loading: false });
    set({ productos });
  },
  get_productos_stock_bajo: async () => {
    const productos_stock_bajo: ProductoInterface[] = await getProductosAction(
      1000,
      true,
      false,
      null,
      true
    );
    set({ loading: false });
    set({ productos_stock_bajo });
  },
}));
