export function formatoMonedaRD(numero: number): string {
  return numero.toLocaleString("es-DO", { style: "currency", currency: "DOP" });
}
