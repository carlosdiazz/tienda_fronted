import { getRoleByIdAction } from "@/actions";
import { RoleForm, RoleInterface } from "@/components";
import { notFound } from "next/navigation";

type Params = Promise<{
  id: string;
}>;

export default async function RoleEditPage(props: { params: Promise<Params> }) {
  const params = await props.params;
  const id = Number(params.id);
  if (isNaN(id)) {
    notFound();
  }

  const isRole = await getRoleByIdAction(id);
  if (isRole === null) {
    notFound();
  }

  const role: RoleInterface = isRole;

  return (
    <div className="w-full mx-auto">
      <RoleForm role={role} />
    </div>
  );
}
