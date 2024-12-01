import { getUsuarioByIdAction } from "@/actions";
import { UsuarioForm, UsuarioInterface } from "@/components";
import { notFound } from "next/navigation";

type Params = Promise<{
  id: string;
}>;

export default async function UsuarioPage(props: { params: Promise<Params> }) {
  const params = await props.params;
  const id = Number(params.id);
  if (isNaN(id)) {
    notFound();
  }

  const isUsuario = await getUsuarioByIdAction(id);
  if (isUsuario === null) {
    notFound();
  }

  const usuario: UsuarioInterface = isUsuario;

  return (
    <div className="w-full mx-auto">
      <UsuarioForm usuario={usuario} />
    </div>
  );
}
