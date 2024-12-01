"use client";
import { MenuItemInterface } from "@/interface";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PermisoClient } from "./Permiso-client";


interface Props {
  item: MenuItemInterface;
  onClick?: () => void;
}

export const NavbarItem = ({ item, onClick }: Props) => {
  const { Icon, Path, Title, permiso_view } = item;
  const pathname = usePathname();

  const Widget = (
    <Link
      onClick={onClick}
      href={Path}
      className={`ml-5 flex items-center gap-3 rounded-lg px-3 py-3  transition-all hover:text-primary ${
        pathname === Path ? "bg-muted text-primary " : "text-muted-foreground"
      }`}
    >
      {Icon}
      {Title}
    </Link>
  );

  return <PermisoClient permiso={permiso_view}>{Widget}</PermisoClient>;
};
