import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { ClienteInterface } from "./clientes.interface";

export const generateClientesReportPDF = (clientes: ClienteInterface[]) => {
  const doc = new jsPDF({
    format: "a4",
    unit: "mm",
  });

  // Configuración de colores y estilos
  const primaryColor = "#4A90E2"; // Azul principal
  const textColor = "#333333"; // Texto oscuro
  const new_clientes = clientes.slice(1);

  // ENCABEZADO
  doc.setFillColor(primaryColor);
  doc.rect(0, 0, 210, 20, "F");
  doc.setTextColor("#FFFFFF");
  doc.setFontSize(16);
  doc.text("Reporte de Clientes - MaxSerComp", 10, 12);
  doc.setFontSize(10);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 10, 17);

  // TABLA DE USUARIOS
  autoTable(doc, {
    startY: 30,
    head: [["Nombre", "Telefono", "Documento", "Tipo de documento"]],
    body: new_clientes.map((cliente) => [
      cliente.name,
      cliente.telefono,
      cliente.documento,
      cliente.tipo_documento,
    ]),
    theme: "grid",
    headStyles: { fillColor: [74, 144, 226] }, // Azul
    styles: { fontSize: 10, textColor: textColor, cellPadding: 3 },
    columnStyles: {
      0: { cellWidth: 50 }, // Nombre
      1: { cellWidth: 50 }, // Email
      2: { cellWidth: 40 }, // Nickname
      3: { cellWidth: 40 }, // Nickname
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
  doc.save("reporte_clientes.pdf");
};
