"use client";

export default function ProductosPage() {
  return (
    <div>
      <div className="w-full mx-auto py-2 px-2">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex gap-4">
            <h1 className="text-lg font-semibold md:text-2xl mb-2">
              Productos
            </h1>
          </div>

          <div className="flex justify-end m-2 gap-x-4"></div>
        </div>
      </div>
    </div>
  );
}
