import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { EmpresaInterface } from "./empresa.interface";
import { formatoMonedaRD } from "@/lib";

export const generateEmpleadosReportPDF = (empleados: EmpresaInterface[]) => {
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
  doc.text("Reporte de Empleados - MaxSerComp", 10, 12);
  doc.setFontSize(10);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 10, 17);

  // TABLA DE USUARIOS
  autoTable(doc, {
    startY: 30,
    head: [["Nombre", "Descripcion", "Codigo", "Cedula", "Sueldo", "Fecha"]],
    body: empleados.map((empleado) => [
      empleado.name,
      empleado.descripcion,
      empleado.codigo,
      empleado.cedula,
      formatoMonedaRD(empleado.sueldo),
      empleado.fecha.slice(0, 10),
    ]),
    theme: "grid",
    headStyles: { fillColor: [74, 144, 226] }, // Azul
    styles: { fontSize: 10, textColor: textColor, cellPadding: 3 },
    columnStyles: {
      0: { cellWidth: 30 }, // Nombre
      1: { cellWidth: 30 }, // Email
      2: { cellWidth: 20 }, // Nickname
      3: { cellWidth: 30 }, // Nickname
      4: { cellWidth: 40 }, // Nickname
      5: { cellWidth: 30 }, // Nickname
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
  doc.save("reporte_empleados.pdf");
};
