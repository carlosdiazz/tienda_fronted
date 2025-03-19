"use client";
import { useSession } from "next-auth/react";
import { BadgeCheck, ChevronsUpDown, LogOut } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui";
import { toast } from "sonner";
import { logoutAction } from "@/actions";
import Link from "next/link";
import { AppRouter, PermisoAccion } from "@/config";
import { PermisoClient } from "./Permiso-client";
import { ThemeToggler } from "./ThemeToggler";

export function NavUser() {
  const { data } = useSession({ required: true });
  const { isMobile } = useSidebar();

  const logout = async () => {
    toast.success("Cerrando");
    await logoutAction();
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg">
                  {data?.user?.name?.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {data?.user?.name}
                </span>
                <span className="truncate text-xs">{data?.user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">
                    {data?.user?.name?.slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {data?.user?.name}
                  </span>
                  <span className="truncate text-xs">{data?.user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuGroup>
              <PermisoClient permiso={PermisoAccion.USER_UPDATE}>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <BadgeCheck />

                  <Link href={`${AppRouter.adminUsuarios}/${data?.user.id}`}>
                    <DropdownMenuItem>Configuracion</DropdownMenuItem>
                  </Link>
                </DropdownMenuItem>
              </PermisoClient>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={logout}
              className="cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <LogOut />
              <span className="ml-2">Cerrar Sesion</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ThemeToggler />
              <span className="ml-2">Tema</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
