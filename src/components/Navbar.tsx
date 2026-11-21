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
        </div>
      </nav>
    </header>
  );
};
