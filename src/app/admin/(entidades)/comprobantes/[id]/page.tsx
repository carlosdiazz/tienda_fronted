import { getComprobanteByIdAction } from "@/actions";
import { ComprobanteForm, ComprobanteInterface } from "@/components";
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

  const isComprobante = await getComprobanteByIdAction(id);
  if (isComprobante === null) {
    notFound();
  }

  const comprobante: ComprobanteInterface = isComprobante;

  return (
    <div className="w-full mx-auto">
      <ComprobanteForm comprobante={comprobante} />
    </div>
  );
}
