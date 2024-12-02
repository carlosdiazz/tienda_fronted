
import { getProductoByIdAction } from "@/actions";
import { ProductoForm, ProductoInterface } from "@/components";
import { notFound } from "next/navigation";

type Params = Promise<{
  id: string;
}>;

export default async function ProductoEdit(props: { params: Promise<Params> }) {
  const params = await props.params;
  const id = Number(params.id);
  if (isNaN(id)) {
    notFound();
  }

  const isProducto = await getProductoByIdAction(id);
  if (isProducto === null) {
    notFound();
  }

  const producto: ProductoInterface = isProducto;

  return (
    <div className="w-full mx-auto">
      <ProductoForm producto={producto} />
    </div>
  );
}
