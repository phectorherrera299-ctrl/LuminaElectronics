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
              onClick={() => cambiarRol('Admin')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                esAdmin
                  ? 'bg-primary-500 text-white shadow-xs'
                  : 'text-secondary-500 hover:text-secondary-900'
              }`}
            >
              Admin
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
