"use client";

import {
  Button,
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
              <SidebarMenuButton
                tooltip={Title}
                className="w-full flex items-center"
              >
               <Button className="flex-1 text-left justify-start" variant={"secondary"}>{Title}</Button>
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {Items.map((subItem) => (
                  <PermisoClient
                    key={subItem.Title}
                    permiso={subItem.permiso_view}
                  >
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
