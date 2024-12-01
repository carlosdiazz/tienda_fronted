import Link from "next/link";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Label,
  Switch,
} from "../ui";
import { UsuarioInterface } from "./usuario.interface";
import { AppRouter, PermisoAccion } from "@/config";
import { PermisoClient } from "../common";

interface Props {
  usuarios: UsuarioInterface[];
}

export const UsuarioGrid = ({ usuarios }: Props) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {usuarios.map((usuario) => (
          <CardUsuario usuario={usuario} key={usuario.id} />
        ))}
      </div>
    </div>
  );
};

interface PropsCardUsuario {
  usuario: UsuarioInterface;
}

export const CardUsuario = ({ usuario }: PropsCardUsuario) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">{usuario.name}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex  justify-between items-center gap-3  mt-2">
          <Label className="text-md">Activo</Label>
          <Switch checked={usuario.activo} />
        </div>

        <div className="flex  justify-between items-center gap-3  mt-2">
          <Label className="text-md">Nickname: </Label>
          <Label className="text-md">{usuario.nickname}</Label>
        </div>

        <div className="flex  justify-between items-center gap-3  mt-2">
          <Label className="text-md">Email: </Label>
          <Label className="text-md">{usuario.email}</Label>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-x-2">
        <PermisoClient permiso={PermisoAccion.USER_UPDATE}>
          <Link href={`${AppRouter.adminUsuarios}/${usuario.id}`}>
            <Button variant="default">Editar</Button>
          </Link>
        </PermisoClient>

        <PermisoClient permiso={PermisoAccion.USER_VIEW}>
          <Link href={`${AppRouter.adminUsuarios}/${usuario.id}`}>
            <Button variant="secondary">Ver</Button>
          </Link>
        </PermisoClient>
      </CardFooter>
    </Card>
  );
};
