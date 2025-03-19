"use client";

import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui";
import Link from "next/link";
import { MenuItemInterface } from "@/interface";
import { JSX } from "react";
import { PermisoClient } from "./Permiso-client";

interface Props {
  Title: string;
  Icon: JSX.Element;
  IsActive: boolean;
  Items: MenuItemInterface[];
}

export function NavMain({ Icon, IsActive, Items, Title }: Props) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        <Collapsible
          key={Title}
          asChild
          defaultOpen={IsActive}
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={Title}>
                {Icon}
                <span>{Title}</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {Items.map((subItem) => (
                  <PermisoClient key={subItem.Title} permiso={subItem.permiso_view}>
                    <SidebarMenuSubItem key={subItem.Title}>
                      <SidebarMenuSubButton asChild>
                        <Link href={subItem.Path}>
                          <h2>{subItem.Title}</h2>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </PermisoClient>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
}
