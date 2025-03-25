import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ProductoInterface } from "./producto.interface";
import { formatoMonedaRD } from "@/lib";

export const generateProductosReportPDF = (productos: ProductoInterface[]) => {
  const doc = new jsPDF({
    format: "a4",
    unit: "mm",
  });

  // Configuración de colores y estilos
  const primaryColor = "#4A90E2"; // Azul principal
  const textColor = "#333333"; // Texto oscuro

  // ENCABEZADO
  doc.setFillColor(primaryColor);
  doc.rect(0, 0, 210, 20, "F");
  doc.setTextColor("#FFFFFF");
  doc.setFontSize(16);
  doc.text("Reporte de Productos - MaxSerComp", 10, 12);
  doc.setFontSize(10);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 10, 17);

  // TABLA DE USUARIOS
  autoTable(doc, {
    startY: 30,
    head: [
      [
        "Codigo",
        "Nombre",
        "Descripcion",
        "Precio",
        "Stock",
        "Precio de Compra",
      ],
    ],
    body: productos.map((productos) => [
      productos.codigo,
      productos.name,
      productos.descripcion,
      formatoMonedaRD(productos.price),
      productos.stock,
      formatoMonedaRD(productos.price_de_compra),
    ]),
    theme: "grid",
    headStyles: { fillColor: [74, 144, 226] }, // Azul
    styles: { fontSize: 10, textColor: textColor, cellPadding: 3 },
    columnStyles: {
      0: { cellWidth: 30 }, // Codigo
      1: { cellWidth: 40 }, // name
      2: { cellWidth: 40 }, // descripcion
      3: { cellWidth: 30 }, // price
      4: { cellWidth: 20 }, // stock
      5: { cellWidth: 30 }, // price de compra
    },
  });

  //PIE DE PÁGINA
  // PIE DE PÁGINA
  const pageCount = doc.internal.pages.length; // 🔹 Corrección aquí
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor("#555555");
    //doc.text(`Página ${i} de ${pageCount}`, 180, 290);
    doc.text("MaxSerComp - La Vega, Rep. Dom.", 10, 290);
  }

  // Guardar el PDF
  doc.save("reporte_productos.pdf");
};
