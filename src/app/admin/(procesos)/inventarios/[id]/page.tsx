import {
  emptyInventario,
  InventarioForm,
  InventarioInterface,
  LoadingForm,
} from "@/components";
import { notFound } from "next/navigation";

type Params = Promise<{
  id: string;
}>;

export default async function InventarioEdit(props: {
  params: Promise<Params>;
}) {
  const params = await props.params;
  const id = Number(params.id);
  if (isNaN(id)) {
    notFound();
  }

  if (id !== 0) {
    notFound();
  }

  const inventario: InventarioInterface = emptyInventario;

  return (
    <div className="w-full mx-auto">
      <LoadingForm inventario={inventario} />
    </div>
  );
}
