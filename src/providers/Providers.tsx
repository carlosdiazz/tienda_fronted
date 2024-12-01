"use client";

import { ApolloWrapper, Toaster } from "@/components";
import { ThemeProvider } from "./theme-provider";
import { SessionAuthProvider } from "./SessionAuthProvider";

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ApolloWrapper>
        <SessionAuthProvider>
          {children}
          <Toaster richColors/>
        </SessionAuthProvider>
      </ApolloWrapper>
    </ThemeProvider>
  );
};