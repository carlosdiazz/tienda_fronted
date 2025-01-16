import { getClienteByIdAction } from "@/actions";
import { ClienteForm, ClienteInterface } from "@/components";
import { notFound } from "next/navigation";

type Params = Promise<{
  id: string;
}>;

export default async function ClienteEdit(props: { params: Promise<Params> }) {
  const params = await props.params;
  const id = Number(params.id);
  if (isNaN(id)) {
    notFound();
  }

  const isCliente = await getClienteByIdAction(id);
  if (isCliente === null) {
    notFound();
  }

  const cliente: ClienteInterface = isCliente;

  return (
    <div className="w-full mx-auto">
      <ClienteForm cliente={cliente} />
    </div>
  );
}
