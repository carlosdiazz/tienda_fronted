"use client";
import { useState } from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui";
import { CircleUser, Home, Menu } from "lucide-react";

import { AppRouter, PermisoAccion } from "@/config";
import { logoutAction } from "@/actions";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { PermisoClient } from "./Permiso-client";
import { Navbar } from "./Navbar";
import { useRouter } from "next/navigation";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data, update } = useSession({ required: true });

  const router = useRouter();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const logout = async () => {
    toast.success("Cerrando");
    await logoutAction();
    //await update()
    router.refresh();
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" onClick={openMenu} />
          </Button>
        </SheetTrigger>
        <Link
          href={AppRouter.adminHome}
          className="flex items-center gap-2 font-semibold"
        >
          <Home className="h-6 w-6" />
        </Link>
        <SheetTitle>{data?.user.nickname}</SheetTitle>
        <SheetDescription>| {data?.user?.name}</SheetDescription>
        <SheetContent side="left" className="flex flex-col">
          <Navbar closeMenu={closeMenu} />
        </SheetContent>
      </Sheet>

      <div className="w-full flex-1" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <PermisoClient permiso={PermisoAccion.USER_UPDATE}>
            <Link href={`${AppRouter.adminUsuarios}/${data?.user.id}`}>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </Link>
          </PermisoClient>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
