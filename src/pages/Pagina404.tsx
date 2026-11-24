import { useState, type FormEvent } from "react";
import type { Producto } from "../types/Producto";

interface PropiedadesPagina404 {
  alNavegar?: (seccion: string) => void;
  productos?: Producto[];
}

export const Pagina404 = ({ alNavegar }: PropiedadesPagina404) => {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");

  const irA = (seccion: string) => {
    if (alNavegar) {
      alNavegar(seccion);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const manejarBusqueda = (e: FormEvent) => {
    e.preventDefault();
    if (terminoBusqueda.trim()) {
      irA("catalogo");
    }
  };

  const productosSugerids = productos.slice(0, 3);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center space-y-8 animate-fade-in">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="relative inline-block">
            <span className="text-8xl sm:text-9xl font-heading font-extrabold text-primary-500/20 tracking-tighter select-none block">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl sm:text-5xl font-heading font-extrabold text-primary-600">
                404
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
            ERROR DE ENLACE • SEÑAL PERDIDA
          </div>

          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-secondary-900">
            Página no encontrada
          </h1>

          <p className="text-sm text-secondary-500 max-w-md mx-auto leading-relaxed">
            Ups, parece que esta señal se perdió en el ciberespacio. El
            producto, categoría o enlace que buscas no existe o ha sido
            reubicado en nuestra última actualización.
          </p>
        </div>
        <form
          onSubmit={manejarBusqueda}
          className="max-w-md mx-auto flex gap-2"
        >
          <input
            type="text"
            value={terminoBusqueda}
            onChange={(e) => setTerminoBusqueda(e.target.value)}
            placeholder="Buscar laptops, GPU, periféricos..."
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-white border border-secondary-200 rounded-xl text-secondary-900 placeholder:text-secondary-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all shadow-xs"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            Buscar
          </button>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-4 text-left">
          <button
            type="button"
            onClick={() => irA("catalogo")}
            className="p-4 bg-white rounded-2xl border border-secondary-200 hover:border-primary-300 hover:shadow-sm transition-all group cursor-pointer"
          >
            <span className="text-lg block mb-2">🛍️</span>
            <h2 className="font-heading font-bold text-xs text-secondary-900 group-hover:text-primary-600 transition-colors flex items-center justify-between">
              <span>Catálogo Principal</span>
              <span>→</span>
            </h2>
            <p className="text-[11px] text-secondary-400 mt-1">
              Explora miles de componentes, rigs y periféricos certificados.
            </p>
          </button>
          <button
            type="button"
            onClick={() => irA("catalogo")}
            className="p-4 bg-white rounded-2xl border border-secondary-200 hover:border-primary-300 hover:shadow-sm transition-all group cursor-pointer"
          >
            <span className="text-lg block mb-2">🔥</span>
            <h2 className="font-heading font-bold text-xs text-secondary-900 group-hover:text-primary-600 transition-colors flex items-center justify-between">
              <span>Ofertas Destacadas</span>
              <span>→</span>
            </h2>
            <p className="text-[11px] text-secondary-400 mt-1">
              Descubre drops semanales y rebajas de hasta un 35% de descuento.
            </p>
          </button>

          <div className="p-4 bg-white rounded-2xl border border-secondary-200 text-left">
            <span className="text-lg block mb-2">💬</span>
            <h2 className="font-heading font-bold text-xs text-secondary-900">
              Soporte Lumina
            </h2>
            <p className="text-[11px] text-secondary-400 mt-1">
              Chatea con especialistas técnicos para resolver tus dudas de
              compra.
            </p>
          </div>
        </div>
      </div>
      {productosSugeridos.length > 0 && (
        <section className="space-y-6 pt-8 border-t border-secondary-200/60">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold text-primary-500 uppercase tracking-wider block">
                Tendencias del Momento
              </span>
              <h2 className="text-xl font-heading font-bold text-secondary-900">
                Quizás te interese
              </h2>
            </div>
            <button
              type="button"
              onClick={() => irA("catalogo")}
              className="text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors cursor-pointer self-start sm:self-auto"
            >
              Ver todo el catálogo →
            </button>
          </div>
        </section>
      )}
    </main>
  );
};
