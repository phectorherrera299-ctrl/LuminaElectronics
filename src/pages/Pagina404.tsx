import { useState, type FormEvent } from "react";

interface PropiedadesPagina404 {
  alNavegar?: (seccion: string) => void;
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

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center space-y-8 animate-fade-in">
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
          Ups, parece que esta señal se perdió en el ciberespacio. El producto,
          categoría o enlace que buscas no existe o ha sido reubicado en nuestra
          última actualización.
        </p>
      </div>
      <form onSubmit={manejarBusqueda} className="max-w-md mx-auto flex gap-2">
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
    </main>
  );
};
