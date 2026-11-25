import { useState } from "react";
import { useAutenticacion } from "../context/ContextoAutenticacion";

interface PropiedadesNavbar {
  cantidadDeseos?: number;
  cantidadCarrito?: number;
  seccionActiva?: string;
  alNavegar?: (seccion: string) => void;
}

export const Navbar = ({
  cantidadDeseos = 0,
  cantidadCarrito = 0,
  seccionActiva = "catalogo",
  alNavegar,
}: PropiedadesNavbar) => {
  const { usuario, cambiarRol, esAdmin } = useAutenticacion();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const manejarNavegacion = (seccion: string) => {
    if (alNavegar) alNavegar(seccion);
    setMenuAbierto(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-secondary-200">
      <div className="bg-secondary-900 text-white text-[11px] py-1.5 px-4 text-center hidden md:block">
        <span className="font-semibold text-primary-300">
          NUEVA TEMPORADA 2026
        </span>{" "}
        • Aprovecha 15% OFF con el código{" "}
        <strong className="text-white underline">LUMINA15</strong>
      </div>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={() => manejarNavegacion("catalogo")}
            className="flex items-center gap-2 text-left cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-primary-500 text-white font-heading font-extrabold flex items-center justify-center text-lg shadow-xs">
              L
            </div>
            <div>
              <span className="font-heading font-extrabold text-secondary-900 text-base leading-none block">
                Lumina
              </span>
              <span className="text-[9px] tracking-widest text-primary-500 uppercase font-bold block">
                Electronics
              </span>
            </div>
          </button>
          <div className="hidden md:flex items-center gap-6 text-xs font-semibold">
            <button
              type="button"
              onClick={() => manejarNavegacion("catalogo")}
              className={`transition-colors cursor-pointer ${
                seccionActiva === "catalogo"
                  ? "text-primary-600 font-bold"
                  : "text-secondary-600 hover:text-secondary-900"
              }`}
            >
              Catálogo
            </button>
            <button
              type="button"
              onClick={() => manejarNavegacion("nosotros")}
              className={`transition-colors cursor-pointer ${
                seccionActiva === "nosotros"
                  ? "text-primary-600 font-bold"
                  : "text-secondary-600 hover:text-secondary-900"
              }`}
            >
              Nosotros
            </button>
            <button
              type="button"
              onClick={() => manejarNavegacion("admin")}
              className={`transition-colors cursor-pointer ${
                seccionActiva === "admin"
                  ? "text-primary-600 font-bold"
                  : "text-secondary-600 hover:text-secondary-900"
              }`}
            >
              Admin Panel
              {esAdmin && (
                <span className="ml-1.5 px-1.5 py-0.5 text-[9px] bg-primary-100 text-primary-700 rounded-md">
                  PRO
                </span>
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => manejarNavegacion("login")}
            className="hidden sm:inline-flex rounded-xl bg-primary-50 px-3 py-2 text-xs font-bold text-primary-700 transition hover:bg-primary-100"
          >
            Iniciar sesión
          </button>
          <div className="flex items-center bg-secondary-100 p-0.5 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => cambiarRol("Invitado")}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                !esAdmin
                  ? "bg-white text-secondary-900 shadow-xs"
                  : "text-secondary-500 hover:text-secondary-900"
              }`}
            >
              Invitado
            </button>
            <button
              type="button"
              onClick={() => cambiarRol("Admin")}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                esAdmin
                  ? "bg-primary-500 text-white shadow-xs"
                  : "text-secondary-500 hover:text-secondary-900"
              }`}
            >
              Admin
            </button>
          </div>
          <button
            type="button"
            aria-label="Lista de deseos"
            className="relative w-9 h-9 rounded-xl border border-secondary-200 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50 flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            {cantidadDeseos > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-error text-white text-[10px] font-bold flex items-center justify-center">
                {cantidadDeseos}
              </span>
            )}
          </button>
          <button
            type="button"
            aria-label="Carrito de compras"
            className="relative w-9 h-9 rounded-xl border border-secondary-200 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50 flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            {cantidadCarrito > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary-500 text-white text-[10px] font-bold flex items-center justify-center">
                {cantidadCarrito}
              </span>
            )}
          </button>
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-secondary-200">
            <div className="w-8 h-8 rounded-full bg-secondary-200 overflow-hidden flex items-center justify-center text-secondary-700 font-bold text-xs">
              {usuario.nombre.charAt(0)}
            </div>
            <div className="text-left text-xs">
              <span className="font-semibold text-secondary-900 block leading-tight">
                {usuario.nombre}
              </span>
              <span className="text-[10px] text-secondary-500 block leading-tight">
                {usuario.rol}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="md:hidden p-2 text-secondary-600 hover:text-secondary-900 cursor-pointer"
            aria-label="Abrir menú"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </nav>
      {menuAbierto && (
        <div className="md:hidden border-t border-secondary-200 bg-white px-4 py-3 space-y-2">
          <button
            type="button"
            onClick={() => manejarNavegacion("catalogo")}
            className="block w-full text-left py-2 text-sm font-semibold text-secondary-700 hover:text-primary-600 cursor-pointer"
          >
            Catálogo
          </button>
          <button
            type="button"
            onClick={() => manejarNavegacion("nosotros")}
            className="block w-full text-left py-2 text-sm font-semibold text-secondary-700 hover:text-primary-600 cursor-pointer"
          >
            Nosotros
          </button>
          <button
            type="button"
            onClick={() => manejarNavegacion("admin")}
            className="block w-full text-left py-2 text-sm font-semibold text-secondary-700 hover:text-primary-600 cursor-pointer"
          >
            Admin Panel
          </button>
        </div>
      )}
    </header>
  );
};
