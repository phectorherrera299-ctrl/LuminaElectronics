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
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl border border-secondary-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-secondary-100">
              <span className="text-xs font-bold text-secondary-900 font-heading">
                Ficha Técnica del Proyecto
              </span>
              <span className="px-2 py-0.5 rounded-md bg-tertiary-50 text-tertiary-700 text-[10px] font-bold">
                AUDITORÍA V2.4
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-secondary-50 border border-secondary-100 space-y-1">
                <span className="text-2xl sm:text-3xl font-heading font-extrabold text-primary-600 block">
                  99.8%
                </span>
                <span className="text-[11px] font-semibold text-secondary-500 uppercase tracking-wider block">
                  Lighthouse Perf.
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-secondary-50 border border-secondary-100 space-y-1">
                <span className="text-2xl sm:text-3xl font-heading font-extrabold text-secondary-900 block">
                  &lt; 180ms
                </span>
                <span className="text-[11px] font-semibold text-secondary-500 uppercase tracking-wider block">
                  Tiempo de Carga
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-secondary-50 border border-secondary-100 space-y-1">
                <span className="text-2xl sm:text-3xl font-heading font-extrabold text-secondary-900 block">
                  32+
                </span>
                <span className="text-[11px] font-semibold text-secondary-500 uppercase tracking-wider block">
                  Componentes UI
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-secondary-50 border border-secondary-100 space-y-1">
                <span className="text-2xl sm:text-3xl font-heading font-extrabold text-tertiary-600 block">
                  100%
                </span>
                <span className="text-[11px] font-semibold text-secondary-500 uppercase tracking-wider block">
                  Responsive Web
                </span>
              </div>
            </div>
            <div className="pt-2">
              <div className="flex justify-between text-[11px] text-secondary-500 mb-1">
                <span>Pruebas Unitarias &amp; Cobertura</span>
                <span className="font-bold text-secondary-800">
                  94.5% Pasadas
                </span>
              </div>
              <div className="w-full h-1.5 bg-secondary-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 rounded-full w-[94.5%]" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="space-y-6">
        <div>
          <span className="text-[11px] font-bold text-primary-500 uppercase tracking-wider block">
            Nuestros Fundamentos
          </span>
          <h2 className="text-2xl font-heading font-bold text-secondary-900">
            La ingeniería detrás de cada clic
          </h2>
          <p className="text-xs text-secondary-500 mt-1 max-w-xl">
            Diseñamos Lumina pensando en escalabilidad productiva, no solo en un
            prototipo estético. Cuatro pilares estructuran nuestro stack.
          </p>
        </div>
      </section>
    </main>
  );
};
