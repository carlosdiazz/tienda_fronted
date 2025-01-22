import { create } from "zustand";

export type Producto = {
  id: number;
  name: string;
  price: number;
};

export type ProductoSeleccionado = {
  id: number;
  name: string;
  price: number;
  cantidad: number;
};

interface VentasState {
  total: number;
  productosSeleccionados: ProductoSeleccionado[];
  agregarProducto: (producto: Producto, cantidad: number) => void;
  removerProducto: (id_producto: number) => void;
}

export const useVentasStore = create<VentasState>((set, get) => ({
  total: 0,
  productosSeleccionados: [],
  agregarProducto: (producto, cantidad) => {
    set((state) => {
      const productoExistente = state.productosSeleccionados.find(
        (p) => p.id === producto.id
      );
      let nuevosProductosSeleccionados;

      if (productoExistente) {
        nuevosProductosSeleccionados = state.productosSeleccionados.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + cantidad } : p
        );
      } else {
        nuevosProductosSeleccionados = [
          ...state.productosSeleccionados,
          { ...producto, cantidad },
        ];
      }

      const nuevoTotal = nuevosProductosSeleccionados.reduce(
        (sum, p) => sum + p.price * p.cantidad,
        0
      );

      return {
        productosSeleccionados: nuevosProductosSeleccionados,
        total: nuevoTotal,
      };
    });
  },
  removerProducto: (productoId) => {
    set((state) => {
      const nuevosProductosSeleccionados = state.productosSeleccionados.filter(
        (p) => p.id !== productoId
      );
      const nuevoTotal = nuevosProductosSeleccionados.reduce(
        (sum, p) => sum + p.price * p.cantidad,
        0
      );

      return {
        productosSeleccionados: nuevosProductosSeleccionados,
        total: nuevoTotal,
      };
    });
  },
}));
