"use client";

import { AppRouter, PermisoAccion } from "@/config";
import {  PermisoClient } from "../common";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Label,
  Switch,
} from "../ui";
import { EmpresaInterface } from "./empresa.interface";
import { useState } from "react";
import { useEmpresaStore } from "./empresa.store";
import { removeEmpresaAction } from "@/actions";
import { toast } from "sonner";
import Link from "next/link";
import { Eye } from "lucide-react";

interface Props {
  empresas: EmpresaInterface[];
}
export const EmpresaGrid = ({ empresas }: Props) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {empresas.map((empresa) => (
          <EmpresaCard empresa={empresa} key={empresa.id} />
        ))}
      </div>
    </div>
  );
};

interface PropsEmpresa {
  empresa: EmpresaInterface;
}

export const EmpresaCard = ({ empresa }: PropsEmpresa) => {
  const [isLoading, setIsLoading] = useState(false);
  const getEmpresas = useEmpresaStore((state) => state.getEmpresas);

  const onDelete = async () => {
    setIsLoading(true);
    const resp = await removeEmpresaAction(empresa.id);
    setIsLoading(false);
    if (resp.error) {
      toast.error(resp.message);
    } else {
      await getEmpresas(100, true);
      toast.success(resp.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between gap-4">
          <div className="flex items-center gap-3">
            <Badge className="h-8" variant={"info"}>
              #: {empresa.codigo}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <h3 className="text-lg font-semibold">{empresa.name}</h3>
        <p className="text-muted-foreground">{empresa.descripcion}</p>

        <div className="flex items-center space-x-2 mt-4">
          <Switch checked={empresa.activo} />
          <Label>Activo</Label>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-x-2">
        <PermisoClient permiso={PermisoAccion.EMPRESA_DELETE}>
          <Button variant="destructive" disabled={isLoading} onClick={onDelete}>
            X
          </Button>
        </PermisoClient>

        <PermisoClient permiso={PermisoAccion.EMPRESA_VIEW}>
          <Link href={`${AppRouter.adminEmpleados}/${empresa.id}`}>
            <Button variant="secondary"><Eye/></Button>
          </Link>
        </PermisoClient>
      </CardFooter>
    </Card>
  );
};
