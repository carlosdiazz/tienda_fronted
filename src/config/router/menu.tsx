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
  MedalIcon,
  Bell,
  GalleryHorizontal
} from "lucide-react";
import { PermisoAccion } from "../constants";


export const menuAdmin: MenuItemInterface[] = [
  {
    Path: AppRouter.adminRoles,
    Title: "Roles",
    Icon: <Printer />,
    permiso_view: PermisoAccion.ROLE_VIEW
  },
  {
    Path: AppRouter.adminEmpleados,
    Title: "Empleados",
    Icon: <Armchair />,
    permiso_view: PermisoAccion.EMPRESA_VIEW
  },

  {
    Path: AppRouter.adminUsuarios,
    Title: "Usuarios",
    Icon: <User2 />,
    permiso_view: PermisoAccion.USER_VIEW
  },

  {
    Path: AppRouter.adminClientes,
    Title: "Clientes",
    Icon: <User />,
    permiso_view: PermisoAccion.CLIENTE_VIEW
  },
  {
    Path: AppRouter.adminProveedores,
    Title: "Proveedores",
    Icon: <Copy />,
    permiso_view: PermisoAccion.PROVEEDOR_VIEW
  },

]

export const menuHome: MenuItemInterface[] = [
  {
    Path: AppRouter.adminHome,
    Title: "Favoritos",
    Icon: <Home />,
    permiso_view: PermisoAccion.ROLE_VIEW
  },
]

export const menuCuentasPorCobrar: MenuItemInterface[] = [
  {
    Path: AppRouter.adminFactura,
    Title: "Facturas",
    Icon: <Hammer />,
    permiso_view: PermisoAccion.FACTURA_VIEW
  },
  {
    Path: AppRouter.adminComprobante,
    Title: "Registrar Recibos",
    Icon: <MedalIcon />,
    permiso_view: PermisoAccion.COMPROBANTE_VIEW
  },
]

export const menuVentas: MenuItemInterface[] = [
  {
    Path: AppRouter.adminVentas,
    Title: "Ventas",
    Icon: <GalleryHorizontal />,
    permiso_view: PermisoAccion.FACTURA_CREATE
  },
]

export const menuEntradaAlmacen: MenuItemInterface[] = [

  {
    Path: AppRouter.adminProductos,
    Title: "Productos",
    Icon: <ChartColumn />,
    permiso_view: PermisoAccion.PRODUCTOS_VIEW
  },
  {
    Path: AppRouter.adminInventario,
    Title: "Entrada de Almacen",
    Icon: <Bell />,
    permiso_view: PermisoAccion.INVENTARIO_CREATE
  },
];
