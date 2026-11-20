import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export type RolUsuario = "Invitado" | "Admin";
interface UsuarioSesion {
  nombre: string;
  email: string;
  rol: RolUsuario;
}

interface TipoContextoAutenticacion {
  usuario: UsuarioSesion;
  cambiarRol: (nuevoRol: RolUsuario) => void;
  esAdmin: boolean;
}

const ContextoAutenticacion = createContext<
  TipoContextoAutenticacion | undefined
>(undefined);

const CLAVE_LOCALSTORAGE_AUTH = "lumina_auth";

const USUARIO_DEFECTO: UsuarioSesion = {
  nombre: "Invitado",
  email: "invitado@lumina.dev",
  rol: "Invitado",
};

export const ProveedorAutenticacion = ({children}:{children: ReactNode;}) => {
  const [usuario, setUsuario] = useState<UsuarioSesion>(() => {
    const guardado = localStorage.getItem(CLAVE_LOCALSTORAGE_AUTH);
    if (guardado) {
      try {
        return JSON.parse(guardado);
      } catch {
        return USUARIO_DEFECTO;
      }
    }
    return USUARIO_DEFECTO;
  });

  useEffect(() => {
    localStorage.setItem(CLAVE_LOCALSTORAGE_AUTH, JSON.stringify(usuario));
  }, [usuario]);

  const cambiarRol = (nuevoRol: RolUsuario) => {
    if (nuevoRol === "Admin") {
      setUsuario({
        nombre: "Administrador",
        email: "admin@lumina.dev",
        rol: "Admin",
      });
    } else {
      setUsuario(USUARIO_DEFECTO);
    }
  };
};
