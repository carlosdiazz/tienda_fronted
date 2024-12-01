import { AppRouter } from "@/config";
import Image from "next/image";
import Link from "next/link";

export const NoFound = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row w-full justify-center items-center align-middle">
      <div className="text-center px-5 mx-5">
        <h2 className={`antialiased text-9xl`}>404</h2>
        <p className="font-semibold text-xl">
          Ruta no encontrada! Lo Sentimos muchos
        </p>
        <p className="font-light">
          <span>Puedes regresar al </span>
          <Link
            href={AppRouter.adminHome}
            className="font-normal hover:underline transition-all"
          >
            Inicio
          </Link>
        </p>
      </div>

      <div className="px-5 mx-5">
        <Image
          src="/not-found.png"
          alt="Starman"
          className="p-5 sm:p-0"
          width={550}
          height={550}
        />
      </div>
    </div>
  )
}
