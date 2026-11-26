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
  registrarUsuario: (
    nombre: string,
    email: string,
    password: string,
    tipoCuenta: TipoCuenta,
  ) => { exito: boolean; mensaje: string };
}

const ContextoAutenticacion = createContext<
  TipoContextoAutenticacion | undefined
>(undefined);
const CLAVE_LOCALSTORAGE_AUTH = "lumina_auth";
const CLAVE_LOCALSTORAGE_USUARIOS = "lumina_usuarios";
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

  const [usuariosRegistrados, setUsuariosRegistrados] = useState<
    UsuarioRegistrado[]
  >(() => {
    const guardados = localStorage.getItem(CLAVE_LOCALSTORAGE_USUARIOS);

    if (guardados) {
      try {
        const usuarios = JSON.parse(guardados);

        return Array.isArray(usuarios) ? usuarios : [];
      } catch {
        return [];
      }
    }

    return [];
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

  useEffect(() => {
    localStorage.setItem(
      CLAVE_LOCALSTORAGE_USUARIOS,
      JSON.stringify(usuariosRegistrados),
    );
  }, [usuariosRegistrados]);

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

  const registrarUsuario = (
    nombre: string,
    email: string,
    password: string,
    tipoCuenta: TipoCuenta,
  ) => {
    const emailNormalizado = email.trim().toLowerCase();

    const existe = usuariosRegistrados.some(
      (usuario) => usuario.email.toLowerCase() === emailNormalizado,
    );
    if (existe) {
      return {
        exito: false,
        mensaje: "Ya existe una cuenta registrada con ese correo electrónico.",
      };
    }

    const nuevoUsuario: UsuarioRegistrado = {
      id: `USR-${Date.now()}`,
      nombre: nombre.trim(),
      email: emailNormalizado,
      password,
      tipoCuenta,
      rol: "Cliente",
      fechaRegistro: new Date().toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      estado: "Activo",
      avatar: nombre
        .trim()
        .split(/\s+/)
        .map((parte) => parte[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    };
    setUsuariosRegistrados((actuales) => [...actuales, nuevoUsuario]);
    return {
      exito: true,
      mensaje: "¡Tu cuenta fue creada correctamente!",
    };
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
         registrarUsuario,
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
