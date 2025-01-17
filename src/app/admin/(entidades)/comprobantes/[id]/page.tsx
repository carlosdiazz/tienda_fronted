import { getProveedorByIdAction } from "@/actions";
import { ProveedorForm, ProveedorInterface } from "@/components";
import { notFound } from "next/navigation";

type Params = Promise<{
  id: string;
}>;

export default async function ProveedorEdit(props: {
  params: Promise<Params>;
}) {
  const params = await props.params;
  const id = Number(params.id);
  if (isNaN(id)) {
    notFound();
  }

  const isProveedor = await getProveedorByIdAction(id);
  if (isProveedor === null) {
    notFound();
  }

  const proveedor: ProveedorInterface = isProveedor;

  return <div className="w-full mx-auto">
    <ProveedorForm proveedor={proveedor} />
  </div>;
}


