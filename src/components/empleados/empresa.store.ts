import { create } from "zustand";
import { EmpresaInterface } from "./empresa.interface";
import { getEmpresasAction } from "@/actions";

interface EmpresaState {
  empresas: EmpresaInterface[];
  loading: boolean;
  getEmpresas: (limit: number, activo?: boolean) => Promise<void>;
}

export const useEmpresaStore = create<EmpresaState>()((set, get) => ({
  empresas: [],
  loading: true,
  getEmpresas: async (limit, activo) => {
    set({ loading: true });
    const new_Activo = activo === undefined ? null : activo;
    const empresas: EmpresaInterface[] = await getEmpresasAction(
      limit,
      new_Activo
    );
    set({ loading: false });
    set({ empresas });
  },
}));
