import { MenuItemInterface } from "@/interface";
import { AppRouter } from "./app-router.router";
import {
  Home,
  Printer,
  User2,
  Armchair,
  ChartColumn,
  Copy,
  User,
  Hammer,
  MedalIcon
} from "lucide-react";
import { PermisoAccion } from "../constants";


export const menuItemEntidades: MenuItemInterface[] = [
  {
    Path: AppRouter.adminHome,
    Title: "Home",
    Icon: <Home />,
    //TODO
    permiso_view: PermisoAccion.ROLE_VIEW
  },
  {
    Path: AppRouter.adminRoles,
    Title: "Roles",
    Icon: <Printer />,
    permiso_view: PermisoAccion.ROLE_VIEW
  },
  {
    Path: AppRouter.adminUsuarios,
    Title: "Usuarios",
    Icon: <User2 />,
    permiso_view: PermisoAccion.USER_VIEW
  },
  {
    Path: AppRouter.adminEmpresas,
    Title: "Empresas",
    Icon: <Armchair />,
    permiso_view: PermisoAccion.EMPRESA_VIEW
  },
  {
    Path: AppRouter.adminProductos,
    Title: "Productos",
    Icon: <ChartColumn />,
    permiso_view: PermisoAccion.PRODUCTOS_VIEW
  },
  {
    Path: AppRouter.adminProveedores,
    Title: "Proveedores",
    Icon: <Copy />,
    permiso_view: PermisoAccion.PROVEEDOR_VIEW
  },
  {
    Path: AppRouter.adminClientes,
    Title: "Clientes",
    Icon: <User />,
    permiso_view: PermisoAccion.CLIENTE_VIEW
  },
  {
    Path: AppRouter.adminFactura,
    Title: "Facturas",
    Icon: <Hammer />,
    permiso_view: PermisoAccion.FACTURA_VIEW
  },
  {
    Path: AppRouter.adminComprobante,
    Title: "Comprobantes",
    Icon: <MedalIcon />,
    permiso_view: PermisoAccion.COMPROBANTE_VIEW
  },

];

export const menuItemProcesos: MenuItemInterface[] = [

];
