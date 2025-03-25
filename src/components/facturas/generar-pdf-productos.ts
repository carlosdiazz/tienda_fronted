import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { formatoMonedaRD } from "@/lib";
import { FacturaInterface } from "./factura.interface";

export const generateFacturaReportPDF = (facturas: FacturaInterface[]) => {
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
  doc.text("Reporte de Facturas - MaxSerComp", 10, 12);
  doc.setFontSize(10);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 10, 17);

  // TABLA DE USUARIOS
  autoTable(doc, {
    startY: 30,
    head: [
      [
        "Codigo",
        "Cliente",
        "Metodo Pago",
        "Total",
        "Total Pagado",
        "Faltante",
        "Status",
      ],
    ],
    body: facturas.map((factura) => [
      factura.codigo_factura,
      factura.cliente.name,
      factura.metodo_pago,
      formatoMonedaRD(factura.total),
      formatoMonedaRD(factura.total_pagado),
      formatoMonedaRD(factura.faltante),
      factura.faltante != 0 ? "Credito" : "Pagada",
    ]),
    theme: "grid",
    headStyles: { fillColor: [74, 144, 226] }, // Azul
    styles: { fontSize: 10, textColor: textColor, cellPadding: 3 },
    columnStyles: {
      0: { cellWidth: 20 }, // Codigo
      1: { cellWidth: 40 }, // name
      2: { cellWidth: 30 }, // MEtodo Pago
      3: { cellWidth: 25 }, // Total
      4: { cellWidth: 25 }, // Total Pagado
      5: { cellWidth: 25 }, // Faltante
      6: { cellWidth: 25 }, // Faltante
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
