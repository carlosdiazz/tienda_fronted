import { getEmpresaByIdAction } from "@/actions";
import { EmpresaForm, EmpresaInterface } from "@/components";
import { notFound } from "next/navigation";

type Params = Promise<{
  id: string;
}>;

export default async function EmpresaEdit(props: { params: Promise<Params> }) {
  const params = await props.params;
  const id = Number(params.id);
  if (isNaN(id)) {
    notFound();
  }

  const isEmpresa = await getEmpresaByIdAction(id);
  if (isEmpresa === null) {
    notFound();
  }

  const empresa: EmpresaInterface = isEmpresa;

  return (
    <div className="w-full mx-auto">
      <EmpresaForm empresa={empresa} />
    </div>
  );
}
