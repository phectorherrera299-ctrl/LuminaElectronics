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
    password: string,
    recordar: boolean,
  ) => { exito: boolean; mensaje: string };
  cerrarSesion: () => void;
  esAdmin: boolean;
  registrarUsuario: (
    nombre: string,
    email: string,
    password: string,
    tipoCuenta: TipoCuenta,
  ) => { exito: boolean; mensaje: string };
  usuariosRegistrados: UsuarioRegistrado[];
  eliminarUsuario: (id: string) => void;
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

  const eliminarUsuario = (id: string) => {
    setUsuariosRegistrados((actuales) =>
      actuales.filter((usuario) => usuario.id !== id),
    );
  };

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
    if (
      emailNormalizado.endsWith("@lumina.dev") ||
      emailNormalizado === "admin@lumina.dev"
    ) {
      return {
        exito: false,
        mensaje:
          "No está permitido registrar cuentas con dominio administrativo (@lumina.dev).",
      };
    }

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
    password: string,
    recordar: boolean,
  ) => {
    const emailNormalizado = email.trim().toLowerCase();
    if (emailNormalizado === "admin@lumina.dev" && password === "Admin2026!") {
      setUsuario({
        nombre: "Administrador",
        email: emailNormalizado,
        rol: "Admin",
      });
      if (recordar) {
        localStorage.setItem("lumina_recordar_sesion", "true");
      }
      return { exito: true, mensaje: "Sesión iniciada como Administrador." };
    }

    const usuarioEncontrado = usuariosRegistrados.find(
      (usuario) =>
        usuario.email.toLowerCase() === emailNormalizado &&
        usuario.password === password,
    );

    if (!usuarioEncontrado) {
      return {
        exito: false,
        mensaje: "El correo electrónico o la contraseña son incorrectos.",
      };
    }

    if (usuarioEncontrado.estado !== "Activo") {
      return {
        exito: false,
        mensaje:
          "Tu cuenta se encuentra inactiva. Contactá con administración.",
      };
    }

    const esRolAdmin = usuarioEncontrado.rol === "Administrador";

    setUsuario({
      nombre: usuarioEncontrado.nombre,
      email: usuarioEncontrado.email,
      rol: esRolAdmin ? "Admin" : "Cliente",
    });
    if (recordar) {
      localStorage.setItem("lumina_recordar_sesion", "true");
    }
    return { exito: true, mensaje: "Sesión iniciada con éxito." };
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
        usuariosRegistrados,
        eliminarUsuario,
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
