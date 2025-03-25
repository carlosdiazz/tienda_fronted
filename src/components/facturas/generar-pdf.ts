import jsPDF from "jspdf";
import { FacturaInterface } from "./factura.interface";
import { formatoMonedaRD } from "@/lib";
export const generateFacturaPDF = (factura: FacturaInterface) => {
  const doc = new jsPDF({
    format: [120, 180], // Tamaño personalizado: 120 mm x 180 mm
    unit: "mm",
  });

  // Colores y configuración
  const primaryColor = "#4A90E2"; // Azul principal
  const textColor = "#333333"; // Texto oscuro
  const lineColor = "#CCCCCC"; // Líneas gris claro

  // Título (Encabezado)
  doc.setFillColor(primaryColor);
  doc.rect(0, 0, 120, 15, "F"); // Encabezado de ancho completo
  doc.setFontSize(12);
  doc.setTextColor("#FFFFFF");
  doc.text("Factura de Maxsercomp ", 5, 10);

  // Información del Cliente (Compacta)
  doc.setFontSize(9);
  doc.setTextColor(textColor);
  doc.text(`Código: ${factura.codigo_factura}`, 5, 20);
  doc.text(`Cliente: ${factura.cliente.name}`, 5, 25);
  doc.text(
    factura.cliente.tipo_documento === "RNC"
      ? `RNC: ${factura.cliente.documento}`
      : "",
    40,
    25
  );
  doc.text(`ID Cliente: ${factura.cliente.id}`, 5, 30);
  //doc.text(`${factura.cliente.tipo_documento==="RNC"? `RNC ${factura.cliente.tipo_documento}`:""}`, 5, 35);

  // Resumen de la Factura
  doc.setDrawColor(lineColor);
  doc.line(5, 35, 115, 35); // Línea separadora
  doc.setFontSize(10);
  doc.text("Resumen", 5, 40);
  doc.setFontSize(9);
  doc.text(
    `Total a pagar: ${formatoMonedaRD(Math.floor(factura.total))}`,
    5,
    45
  );
  doc.text(
    `Pagado: ${formatoMonedaRD(Math.floor(factura.total_pagado))}`,
    5,
    50
  );
  doc.text(`Faltante: ${formatoMonedaRD(Math.floor(factura.faltante))}`, 5, 55);
  doc.text(`Crédito: ${factura.is_credito ? "Sí" : "No"}`, 5, 60);

  // Tabla de Productos
  doc.setFontSize(10);
  doc.line(5, 65, 115, 65); // Línea separadora
  doc.text("Productos", 5, 70);

  // Cabecera de la tabla
  doc.setFillColor(primaryColor);
  doc.setTextColor("#FFFFFF");
  doc.rect(5, 75, 110, 6, "F"); // Fondo de cabecera
  doc.setFontSize(8);
  doc.text("Producto", 7, 79);
  doc.text("Cant.", 40, 79);
  doc.text("Precio", 50, 79);
  doc.text("Total Bruto", 60, 79);
  doc.text("Itbis", 80, 79);
  doc.text("Neto a Pagar", 90, 79);

  // Filas de productos
  doc.setTextColor(textColor);
  let yPosition = 85;
  factura.factura_detalle.forEach((detalle) => {
    doc.rect(5, yPosition - 4, 110, 6); // Borde de fila
    doc.text(`${detalle.producto.name}`, 7, yPosition);
    doc.text(`${detalle.cantidad}`, 40, yPosition);
    doc.text(`${formatoMonedaRD(detalle.precio)}`, 45, yPosition);
    doc.text(`${formatoMonedaRD(detalle.total)}`, 60, yPosition);
    doc.text(
      `${formatoMonedaRD(Math.floor(detalle.total * 0.18))}`,
      75,
      yPosition
    );
    doc.text(
      `${formatoMonedaRD(Math.floor(detalle.total * 1.18))}`,
      95,
      yPosition
    );
    yPosition += 8;
  });

  // Nota Final (Compacta)
  doc.setFontSize(8);
  doc.setTextColor("#555555");
  doc.text("Gracias por su compra.", 5, yPosition + 5);

  // Guardar el PDF
  doc.save(`factura_${factura.codigo_factura}.pdf`);
};
