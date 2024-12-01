import Link from "next/link";
import React from "react";
import { ButtonTheme } from "./button-theme";

export const Footer = () => {
  return (
    <footer className="w-full border-t py-4">
      <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <p className="text-sm text-muted-foreground">
          &copy; All rights reserved.
        </p>
        <nav className="flex items-center gap-9">
          <Link
            href="#"
            className="text-sm hover:underline underline-offset-4"
            prefetch={false}
          >
            Tienda
          </Link>

          <ButtonTheme />
        </nav>
      </div>
    </footer>
  );
};
