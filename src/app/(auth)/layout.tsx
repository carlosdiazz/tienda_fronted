import { auth } from "@/auth";
import { Footer } from "@/components";
import { AppRouter } from "@/config";
import { redirect } from "next/navigation";

export default async function AuthLoginLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  const session = await auth();
  if (session?.user) {
    redirect(`${AppRouter.adminHome}`)
  }

  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
