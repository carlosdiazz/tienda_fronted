"use client";
import { menuItemEntidades, menuItemProcesos } from "@/config";

import { NavbarItem } from "./Navbar-item";
import {
  Badge,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui";
import { useState } from "react";

interface Props{
  closeMenu?:()=>void
}

export const Navbar = ({closeMenu}:Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    <div>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="grid items-start text-sm font-medium px-5"
      >
        <CollapsibleTrigger>
          <Badge className="h-10 p-3 m-3 w-full">Entidades</Badge>
        </CollapsibleTrigger>
        <CollapsibleContent className="collapsible-content">
          {menuItemEntidades.map((item) => (
            <NavbarItem item={item} key={item.Path} onClick={closeMenu}/>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Collapsible
        open={isOpen2}
        onOpenChange={setIsOpen2}
        className="grid items-start text-sm font-medium px-5"
      >
        <CollapsibleTrigger>
          <Badge className="h-10 p-3 m-3 w-full">Procesos</Badge>
        </CollapsibleTrigger>
        <CollapsibleContent className="collapsible-content">
          {menuItemProcesos.map((item) => (
            <NavbarItem item={item} key={item.Path} onClick={closeMenu}/>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
