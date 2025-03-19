import {
  menuAdmin,
  menuCuentasPorCobrar,
  menuEntradaAlmacen,
  menuHome,
  menuVentas,
  PermisoAccion,
} from "@/config";
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "../ui";

import { Home, Gamepad2, FileVideo, Apple, BadgeInfo } from "lucide-react";
import { PermisoClient } from "./Permiso-client";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          Icon={<Home />}
          IsActive={true}
          Title="Home"
          Items={menuHome}
        />
        <PermisoClient permiso={PermisoAccion.USER_VIEW}>
          <NavMain
            Icon={<Gamepad2 />}
            IsActive={false}
            Title="Adminsitracion"
            Items={menuAdmin}
          />
        </PermisoClient>

        <PermisoClient permiso={PermisoAccion.FACTURA_VIEW}>
          <NavMain
            Icon={<FileVideo />}
            IsActive={false}
            Title="Cuentas Por Cobrar"
            Items={menuCuentasPorCobrar}
          />
        </PermisoClient>

        <PermisoClient permiso={PermisoAccion.FACTURA_CREATE}>
          <NavMain
            Icon={<Apple />}
            IsActive={false}
            Title="Ventas"
            Items={menuVentas}
          />
        </PermisoClient>

        <PermisoClient permiso={PermisoAccion.INVENTARIO_CREATE}>
          <NavMain
            Icon={<BadgeInfo />}
            IsActive={false}
            Title="Entrada de Almacen"
            Items={menuEntradaAlmacen}
          />
        </PermisoClient>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
