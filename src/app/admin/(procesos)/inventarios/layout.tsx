import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventario",
  description: "Pagina para crear Inventario",
};


export default function InventarioLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
}