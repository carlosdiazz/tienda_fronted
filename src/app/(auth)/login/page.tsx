import { Loginform } from "@/components";
import { PlataformaConfig, PlataformaConfigInterface } from "@/config";
import Image from "next/image";

export default function LoginPage() {

  const plataforma: PlataformaConfigInterface = PlataformaConfig()
  const {img, name}=plataforma

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-200 dark:bg-slate-900 ">
      <div className="mx-auto w-full max-w-md space-y-8 rounded-lg bg-background p-8 shadow-2xl ">
        <div className="flex flex-col items-center text-center">
          <Image src={img} width={200} height={200} alt={name}className="m-5"/>
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className="mt-2 text-muted-foreground">Iniciar session</p>
        </div>
        <Loginform/>
      </div>
    </div>
  );
}
