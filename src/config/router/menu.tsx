import { MenuItemInterface } from "@/interface";
import { AppRouter } from "./app-router.router";
import {
  Home,
  Printer,
  User2,
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

];

export const menuItemProcesos: MenuItemInterface[] = [

];
