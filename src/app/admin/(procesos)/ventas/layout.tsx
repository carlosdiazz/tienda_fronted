import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ventas",
  description: "Pagina para Vender",
};


export default function VentasLayout({
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