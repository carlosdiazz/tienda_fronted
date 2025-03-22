import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { UsuarioInterface } from "./usuario.interface";

export const generateUsuariosReportPDF = (usuarios: UsuarioInterface[]) => {
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
  doc.text("Reporte de Usuarios - MaxSerComp", 10, 12);
  doc.setFontSize(10);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 10, 17);

  // TABLA DE USUARIOS
  autoTable(doc, {
    startY: 30,
    head: [["Nombre", "Email", "Nickname"]],
    body: usuarios.map((usuario) => [
      usuario.name,
      usuario.email,
      usuario.nickname,
    ]),
    theme: "grid",
    headStyles: { fillColor: [74, 144, 226] }, // Azul
    styles: { fontSize: 10, textColor: textColor, cellPadding: 3 },
    columnStyles: {
      0: { cellWidth: 70 }, // Nombre
      1: { cellWidth: 70 }, // Email
      2: { cellWidth: 50 }, // Nickname
    },
  });

  // PIE DE PÁGINA
  //const pageCount = doc.internal.getNumberOfPages();
  //for (let i = 1; i <= pageCount; i++) {
  //  doc.setPage(i);
  //  doc.setFontSize(10);
  //  doc.setTextColor("#555555");
  //  doc.text(`Página ${i} de ${pageCount}`, 180, 290);
  //  doc.text("MaxSerComp - Empresa de tecnología", 10, 290);
  //}

  // Guardar el PDF
  doc.save("reporte_usuarios.pdf");
};
