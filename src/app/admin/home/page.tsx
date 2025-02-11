import { AdminGrid } from "@/components";

export default function AdminPage() {
  return (
    <div>
      <div className="w-full mx-auto py-2 px-2">
        <h1 className="text-lg font-semibold md:text-2xl mb-2">Favoritos</h1>
        <AdminGrid />
      </div>
    </div>
  );
}
