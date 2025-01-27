import { getFacturaByIdAction } from "@/actions";
import { FacturaForm, FacturaInterface } from "@/components";
import { notFound } from "next/navigation";

type Params = Promise<{
  id: string;
}>;

export default async function FacturaEdit(props: {
  params: Promise<Params>;
}) {
  const params = await props.params;
  const id = Number(params.id);
  if (isNaN(id)) {
    notFound();
  }
  if (id === 0) {
    notFound();
  }

  const isFactura = await getFacturaByIdAction(id);
  if (isFactura === null) {
    notFound();
  }

  const factura: FacturaInterface = isFactura;

  return <div className="w-full mx-auto">
    <FacturaForm factura={factura} />
  </div>;
}


