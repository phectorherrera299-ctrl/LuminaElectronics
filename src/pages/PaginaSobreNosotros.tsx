interface PropiedadesPaginaNosotros {
  alNavegar?: (seccion: string) => void;
}
export const PaginaNosotros = ({ alNavegar }: PropiedadesPaginaNosotros) => {
  const irA = (seccion: string) => {
    if (alNavegar) {
      alNavegar(seccion);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
            PROYECTO FINAL ACADÉMICO • RollingCode School • Cohorte 2025
          </div>

          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-secondary-900 tracking-tight leading-[1.15]">
            Construyendo la nueva experiencia del{" "}
            <span className="text-primary-500">comercio digital</span>.
          </h1>

          <p className="text-secondary-600 text-sm sm:text-base leading-relaxed max-w-xl">
            Lumina Commerce nace de la visión de repensar el retail de
            tecnología de alto desempeño. Una síntesis de arquitectura frontend
            modular, diseño de sistemas riguroso y telemetría de inventario en
            tiempo real concebida con los estándares más exigentes de la
            industria.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => irA("catalogo")}
              className="px-5 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
            >
              Explorar Catálogo →
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white border border-secondary-200 hover:bg-secondary-50 text-secondary-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              Repositorio GitHub ↗
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};
