import { createContext, useState, useEffect, useContext } from "react";
import type { ReactNode } from "react";

export type RolUsuario = "Invitado" | "Cliente" | "Admin";
export type TipoCuenta = "Personal" | "Corporativa";
export type RolCuenta = "Administrador" | "Cliente";

interface UsuarioSesion {
  nombre: string;
  email: string;
  rol: RolUsuario;
}

export interface UsuarioRegistrado {
  id: string;
  nombre: string;
  email: string;
  password: string;
  tipoCuenta: TipoCuenta;
  rol: RolCuenta;
  fechaRegistro: string;
  estado: "Activo" | "Inactivo";
  avatar: string;
}

interface TipoContextoAutenticacion {
  usuario: UsuarioSesion;
  cambiarRol: (nuevoRol: RolUsuario) => void;
  iniciarSesion: (
    email: string,
    rol: Exclude<RolUsuario, "Invitado"> | "Cliente",
    recordar: boolean,
  ) => void;
  cerrarSesion: () => void;
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

export const ProveedorAutenticacion = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [usuario, setUsuario] = useState<UsuarioSesion>(() => {
    const guardado = localStorage.getItem(CLAVE_LOCALSTORAGE_AUTH);
    if (guardado) {
      try {
        return JSON.parse(guardado) as UsuarioSesion;
      } catch {
        return USUARIO_DEFECTO;
      }
    }
    return USUARIO_DEFECTO;
  });

  useEffect(() => {
    if (
      usuario.rol === "Invitado" ||
      localStorage.getItem("lumina_recordar_sesion") !== "true"
    ) {
      localStorage.removeItem(CLAVE_LOCALSTORAGE_AUTH);
    } else {
      localStorage.setItem(CLAVE_LOCALSTORAGE_AUTH, JSON.stringify(usuario));
    }
  }, [usuario]);

  const cambiarRol = (nuevoRol: RolUsuario) => {
    setUsuario(
      nuevoRol === "Admin"
        ? { nombre: "Administrador", email: "admin@lumina.dev", rol: "Admin" }
        : nuevoRol === "Cliente"
          ? {
              nombre: "Cliente Lumina",
              email: "usuario@lumina.dev",
              rol: "Cliente",
            }
          : USUARIO_DEFECTO,
    );
  };

  const iniciarSesion = (
    email: string,
    rol: "Admin" | "Cliente",
    recordar: boolean,
  ) => {
    const nombre =
      rol === "Admin"
        ? "Sofía Valenzuela"
        : (email.split("@")[0] || "Cliente")
            .replace(/[._-]/g, " ")
            .replace(/\b\w/g, (letra) => letra.toUpperCase());
    if (recordar) localStorage.setItem("lumina_recordar_sesion", "true");
    else localStorage.removeItem("lumina_recordar_sesion");
    setUsuario({ nombre, email, rol });
  };

  const cerrarSesion = () => setUsuario(USUARIO_DEFECTO);

  return (
    <ContextoAutenticacion.Provider
      value={{
        usuario,
        cambiarRol,
        iniciarSesion,
        cerrarSesion,
        esAdmin: usuario.rol === "Admin",
      }}
    >
      {children}
    </ContextoAutenticacion.Provider>
  );
};

export const useAutenticacion = () => {
  const contexto = useContext(ContextoAutenticacion);
  if (!contexto)
    throw new Error(
      "useAutenticacion debe usarse dentro de un ProveedorAutenticacion",
    );
  return contexto;
};
