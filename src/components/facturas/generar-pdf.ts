import jsPDF from "jspdf";
import { FacturaInterface } from "./factura.interface";
export const generatePDF = (factura: FacturaInterface) => {
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
  doc.text(`ID Cliente: ${factura.cliente.id}`, 5, 30);

  // Resumen de la Factura
  doc.setDrawColor(lineColor);
  doc.line(5, 35, 115, 35); // Línea separadora
  doc.setFontSize(10);
  doc.text("Resumen", 5, 40);
  doc.setFontSize(9);
  doc.text(`Total: $${factura.total.toFixed(2)}`, 5, 45);
  doc.text(`Pagado: $${factura.total_pagado.toFixed(2)}`, 5, 50);
  doc.text(`Faltante: $${factura.faltante.toFixed(2)}`, 5, 55);
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
  doc.text("Cant.", 60, 79);
  doc.text("Precio", 80, 79);
  doc.text("Total", 100, 79);

  // Filas de productos
  doc.setTextColor(textColor);
  let yPosition = 85;
  factura.factura_detalle.forEach((detalle) => {
    doc.rect(5, yPosition - 4, 110, 6); // Borde de fila
    doc.text(`${detalle.producto.name}`, 7, yPosition);
    doc.text(`${detalle.cantidad}`, 62, yPosition);
    doc.text(`$${detalle.precio.toFixed(2)}`, 82, yPosition);
    doc.text(`$${detalle.total.toFixed(2)}`, 102, yPosition);
    yPosition += 8;
  });

  // Nota Final (Compacta)
  doc.setFontSize(8);
  doc.setTextColor("#555555");
  doc.text("Gracias por su compra.", 5, yPosition + 5);

  // Guardar el PDF
  doc.save(`factura_${factura.codigo_factura}.pdf`);
};

//export const generatePDF = (factura: FacturaInterface) => {
//  const doc = new jsPDF({
//    format: "a5", // Tamaño A5
//    unit: "mm",
//  });
//
//  // Configurar colores y fuentes
//  const primaryColor = "#4A90E2"; // Azul principal
//  const textColor = "#333333"; // Texto oscuro
//  const lineColor = "#CCCCCC"; // Líneas gris claro
//
//  // Título
//  doc.setFillColor(primaryColor);
//  doc.rect(0, 0, 148, 20, "F");
//  doc.setFontSize(14);
//  doc.setTextColor("#FFFFFF");
//  doc.text("Factura", 10, 12);
//
//  // Información del Cliente
//  doc.setTextColor(textColor);
//  doc.setFontSize(10);
//  doc.text(`Código Factura: ${factura.codigo_factura}`, 10, 30);
//  doc.text(`Cliente: ${factura.cliente.name}`, 10, 40);
//  doc.text(`ID Cliente: ${factura.cliente.id}`, 10, 50);
//
//  // Detalles de la Factura
//  doc.setDrawColor(lineColor);
//  doc.line(10, 55, 138, 55); // Línea separadora
//  doc.setFontSize(12);
//  doc.text("Resumen de Factura", 10, 65);
//  doc.setFontSize(10);
//  doc.text(`Total: $${factura.total.toFixed(2)}`, 10, 75);
//  doc.text(`Total Pagado: $${factura.total_pagado.toFixed(2)}`, 10, 85);
//  doc.text(`Faltante: $${factura.faltante.toFixed(2)}`, 10, 95);
//  doc.text(`Crédito: ${factura.is_credito ? "Sí" : "No"}`, 10, 105);
//
//  // Tabla de Productos
//  doc.setDrawColor(lineColor);
//  doc.line(10, 110, 138, 110); // Línea separadora
//  doc.setFontSize(12);
//  doc.text("Productos", 10, 115);
//
//  // Cabecera de la tabla
//  doc.setFontSize(10);
//  doc.setFillColor(primaryColor);
//  doc.setTextColor("#FFFFFF");
//  doc.rect(10, 120, 128, 8, "F"); // Fila de cabecera
//  doc.text("Producto", 12, 126);
//  doc.text("Cantidad", 80, 126);
//  doc.text("Precio", 110, 126);
//
//  // Filas de productos
//  doc.setTextColor(textColor);
//  let yPosition = 135;
//  factura.factura_detalle.forEach((detalle, index) => {
//    doc.rect(10, yPosition - 5, 128, 10); // Línea de fila
//    doc.text(`${detalle.producto.name}`, 12, yPosition);
//    doc.text(`${detalle.cantidad}`, 85, yPosition);
//    doc.text(`$${detalle.precio.toFixed(2)}`, 115, yPosition);
//    yPosition += 12;
//  });
//
//  // Nota final
//  doc.setFontSize(10);
//  doc.setTextColor("#555555");
//  doc.text(
//    "Gracias por su compra. Si tiene alguna duda, contáctenos.",
//    10,
//    yPosition + 10
//  );
//
//  // Guardar el PDF
//  doc.save(`factura_${factura.codigo_factura}.pdf`);
//};
