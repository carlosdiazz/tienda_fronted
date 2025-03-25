import { getComprobanteByIdAction, getFacturaByIdAction } from "@/actions";
import { ComprobanteForm, ComprobanteInterface, emptyComprobante } from "@/components";
import { notFound } from "next/navigation";

type Params = Promise<{
  id: string;
}>;

export default async function ComprobanteEdit(props: {
  params: Promise<Params>;
}) {
  const params = await props.params;
  const id = Number(params.id);
  if (isNaN(id)) {
    notFound();
  }

  const isFactura = await getFacturaByIdAction(id);
  if (isFactura === null) {
    notFound();
  }

  const comprobante: ComprobanteInterface = emptyComprobante;

  return (
    <div className="w-full mx-auto">
      <ComprobanteForm comprobante={comprobante} factura={isFactura}/>
    </div>
  );
}
