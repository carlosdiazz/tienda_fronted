"use client";

import { AppRouter } from "@/config";

import { redirect } from "next/navigation";

export default function ComprobantePage() {
  redirect(`${AppRouter.adminComprobante}/0`);
  //const [activo, setActivo] = useState(true);
  //const [isLoading, setIsLoading] = useState(false);
  //
  //const handleSelectChange = (value: string) => {
  //  if (value === "true") {
  //    setActivo(true);
  //  } else {
  //    setActivo(false);
  //  }
  //};
  //
  //const Comprobante: ComprobanteInterface[] = useComprobanteStore(
  //  (state) => state.Comprobante
  //);
  //const getComprobante = useComprobanteStore((state) => state.getComprobante);
  //const loadingComprobante = useComprobanteStore((state) => state.loading);
  //
  //const permiso = PermisoAccion.COMPROBANTE_VIEW;
  //const toggleFavorites = useFavoritosStore((state) => state.toggleFavorites);
  //const isFavorite = useFavoritosStore((state) => state.isFavorite(permiso));
  //
  //const onSubmit = async () => {
  //  setIsLoading(true);
  //  await getComprobante(10000, activo);
  //  setIsLoading(false);
  //  toast.success("Comprobante Actualizada");
  //};
  //
  //useEffect(() => {
  //  getComprobante(1000, activo);
  //}, [activo]);
  //
  //return (
  //  <div>
  //    <div className="w-full mx-auto py-2 px-2">
  //      <div className="grid grid-cols-1 md:grid-cols-2">
  //        <div className="flex gap-4">
  //          <Button onClick={() => toggleFavorites(permiso)}>
  //          {isFavorite ? <TrashIcon /> : <Star />}
  //          </Button>
  //          <h1 className="text-lg font-semibold md:text-2xl mb-2">
  //            Recibos
  //          </h1>
  //        </div>
  //
  //        <div className="flex justify-end m-2 gap-x-4">
  //          <PermisoClient permiso={PermisoAccion.COMPROBANTE_CREATE}>
  //            <Link href={`${AppRouter.adminComprobante}/0`}>
  //              <Button>Regsitrar Nuevo Recibo +</Button>
  //            </Link>
  //          </PermisoClient>
  //
  //          <Button onClick={onSubmit} disabled={isLoading}>
  //            <UpdateIcon/>
  //          </Button>
  //        </div>
  //      </div>
  //
  //      {loadingComprobante === true ? (
  //        <LoadingPage />
  //      ) : Comprobante.length === 0 ? (
  //        <EmptyEntity
  //          title="No hay Comprobante creada"
  //          subTitle="Para crear un nuevoa Comprobante pulsa '+'"
  //        />
  //      ) : (
  //        <ComprobanteGrid Comprobantes={Comprobante} />
  //      )}
  //    </div>
  //  </div>
  //);
}
