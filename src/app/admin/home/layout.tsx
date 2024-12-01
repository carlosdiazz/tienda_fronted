"use client";
import { LoadingPage } from "@/components";
import { useSession } from "next-auth/react";
import { useEffect } from "react";


export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status, update } = useSession({required:true})

  useEffect(() => {
    update()
  }, [])


  if (status === "loading") {
    return <LoadingPage />;
  }

  return <div>{children}</div>;
}
